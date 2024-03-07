import ClientCard from "./ClientCard"

function ClientList({clients}){
    return(
        <div className="grid grid-cols-3 gap-4">
            {
            clients.map(client => (
                <ClientCard client={client}
                key={client.id}
                />
            ))
        }
        </div>
    )
}

export default ClientList