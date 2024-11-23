import { PropsWithChildren } from 'react'
import '@/assets/styles/globals.css'
// import { title } from 'process';

export const metadata = {
    title: 'Propertly',
    keywords: 'rental, real estate, properies, accomodation',
    description: 'Find your dream home with Propertly',
}

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
    return ( 
        <html>
            <body>
                <main>{children}</main>
            </body> 
        </html>
     );
}
 
export default MainLayout;