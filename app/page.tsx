import Home from './ui/Home';
import {VENUE} from './config';
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':['Restaurant','LocalBusiness'],name:VENUE.name,address:{'@type':'PostalAddress',streetAddress:'Via Napoli 99',addressLocality:'Bari',postalCode:'70123',addressCountry:'IT'},telephone:VENUE.phone,servesCuisine:['Italiana','Pizza'],hasMenu:VENUE.menu})}}/><Home/></>}
