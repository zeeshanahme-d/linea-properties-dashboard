import api from "services/api/api";

const LISTINGS_URL = '/listing';

export function getListings(params: any) {
    return api.get<any>(LISTINGS_URL, { params }).then((response) => response.data);
}

export function getSingleListing(id: string) {
    return api.get<any>(`${LISTINGS_URL}/${id}`).then((response) => response.data);
}

export function updateListingStatus(id: string, status: string) {
    return api.patch<any>(`${LISTINGS_URL}/update-listing-status/${id}`, { status }).then((response) => response.data);
}
export function markAsVerified(id: string, verifiedByAdmin: boolean) {
    return api.patch<any>(`${LISTINGS_URL}/update-verification-status/${id}`, { verifiedByAdmin }).then((response) => response.data);
}