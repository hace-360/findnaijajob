

export async function getServerSideProps () {

    return {
        redirect: {
            destination: '/blog',
            permanent: false
        }
    }
}

export default function Category () {
    return null
}