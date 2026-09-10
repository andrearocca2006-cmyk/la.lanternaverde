from pathlib import Path
import subprocess, json

ROOT=Path('/workspace/scratch/lanterna-assets')
SOURCE=ROOT/'preparation-storyboard.jpg'
def ff(args):
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error',*args],check=True)

names=['dough','stretch','tomato','mozzarella','basil','peel','insertion','cooking','bake','removal','margherita','restart']
for i,name in enumerate(names):
    x=round((i%3)*1448/3)+2
    y=round((i//3)*1086/4)+2
    # Crop only inside the equal-grid frame. FFmpeg performs all media transforms.
    ff(['-i',str(SOURCE),'-vf',f'crop=478:266:{x}:{y}', '-frames:v','1',str(ROOT/f'frame-{i:02d}.png')])
    ff(['-i',str(ROOT/f'frame-{i:02d}.png'),'-vf','scale=960:534:flags=lanczos','-frames:v','1','-quality','84',str(ROOT/f'{name}.webp')])

ff(['-i',str(ROOT/'frame-10.png'),'-vf','scale=1440:810:force_original_aspect_ratio=increase:flags=lanczos,crop=1440:810','-frames:v','1','-quality','85',str(ROOT/'hero-poster.webp')])
ff(['-i',str(ROOT/'frame-10.png'),'-vf','crop=150:266:164:0,scale=540:960:flags=lanczos','-frames:v','1','-quality','85',str(ROOT/'hero-poster-mobile.webp')])

# 12 beats at 1.25s spacing plus overlap, then 0.6s return to first frame.
# The final and first displayed image use the same framing, preventing a jump on loop.
for label,w,h in [('desktop',1280,720),('mobile',540,960)]:
    segments=[]
    for i in range(13):
        n=i%12
        source=str(ROOT/f'frame-{n:02d}.png')
        out=ROOT/f'tmp-{label}-{i:02d}.mp4'
        duration=1.7 if i<12 else .6
        if label=='mobile':
            # Individual portrait crops emphasize hand action, ingredients and oven center.
            centers=[.50,.49,.56,.50,.57,.57,.48,.50,.57,.50,.49,.50]
            cx=round(478*centers[n]-75)
            pre=f'crop=150:266:{cx}:0,'
        else:
            pre=''
        # Very subtle optical push-in; first and closing frames stay locked for looping.
        zoom='1' if i in [0,12] else '1+0.00065*on'
        vf=pre+f'scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,zoompan=z=\'{zoom}\':x=\'iw/2-iw/zoom/2\':y=\'ih/2-ih/zoom/2\':d=1:s={w}x{h}:fps=24,setsar=1,format=yuv420p'
        ff(['-loop','1','-i',source,'-vf',vf,'-t',str(duration),'-an','-c:v','libx264','-preset','fast','-crf','24',str(out)])
        segments.append(out)
    args=[]
    for s in segments: args.extend(['-i',str(s)])
    filters=[]
    last='0:v'
    for i in range(1,13):
        out=f'x{i}'
        filters.append(f'[{last}][{i}:v]xfade=transition=fade:duration=0.45:offset={i*1.25:.2f}[{out}]')
        last=out
    ff([*args,'-filter_complex_threads','1','-filter_complex',';'.join(filters),'-map',f'[{last}]','-an','-r','24','-c:v','libx264','-preset','slow','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(ROOT/f'preparation-{label}.mp4')])
    for s in segments: s.unlink()

provenance={
    'title':'La Lanterna Verde illustrative preparation sequence',
    'method':'Built-in image_gen generated 12-shot storyboard; FFmpeg grid extraction, resizing, per-shot portrait crops, subtle optical push-ins and dissolves.',
    'source':'preparation-storyboard.jpg',
    'prompt':'generation-prompt.txt',
    'disclosure':'AI-generated visual reconstruction. Not footage of the restaurant, its premises, or its staff.',
    'limitations':['Motion is assembled from still images, not continuous recorded food preparation.','The original storyboard is 1448x1086, with individual frames about 482x271 pixels. Encodes are upscaled.','Dough and cooking imagery illustrates the process; it does not document an actual 72-hour timeline.'],
    'video':{'desktop':'1280x720 H.264 silent MP4','mobile':'540x960 H.264 silent MP4; individually framed portrait crops','duration_seconds':15.6,'frame_rate':24,'loop':'Final dissolve returns to first preparation shot.'},
    'stills':names,
}
(ROOT/'provenance.json').write_text(json.dumps(provenance,indent=2)+'\n')
print(json.dumps({p.name:p.stat().st_size for p in ROOT.iterdir() if p.is_file()},indent=2))
