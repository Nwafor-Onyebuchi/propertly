import {NextPage} from 'next'

interface Params {
    id: string
}

interface Search {
    name: string
}


const PropertiesPage:NextPage<{params: Params, searchParams: Search}> = ({params}) => {
    return <div>Properties page {params.id}</div> ;
}
 
export default PropertiesPage;