import { PropsWithChildren } from 'react'
import '@/assets/styles/globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Propertly',
    keywords: 'rental, real estate, properies, accomodation',
    description: 'Find your dream home with Propertly',
}

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {

    return ( 
        <html>
            <body>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </body> 
        </html>
     );
}
 
export default MainLayout;