export interface ClientInterface {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    companyName: string,
    siren: string,
    address: string,
    contact: {
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
    }
}
