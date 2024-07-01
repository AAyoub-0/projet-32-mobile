export class ReservationCreation {
    id?: number | undefined;
    dateReservation: Date;
    dateRetour: Date;
    reservationMateriels: [];
    statutReservation: string;
    association: string | null;
    particulier: string | null;

    constructor(dateReservation: Date, dateRetour: Date, reservationMateriels: [], statutReservation: string, association: string | null, particulier: string | null) {
        this.dateReservation = dateReservation;
        this.dateRetour = dateRetour;
        this.reservationMateriels = reservationMateriels;
        this.statutReservation = statutReservation;
        this.association = association;
        this.particulier = particulier;
    }

    static fromJson(json: any): ReservationCreation {
        console.log('json:', json);
        return new ReservationCreation(
            json.dateReservation,
            json.dateRetour,
            json.reservationMateriels,
            json.statutReservation,
            json.association,
            json.particulier
        );
    }

    static toJson(reservationCreation: ReservationCreation): string {
        return JSON.stringify(reservationCreation);
    }

    setId(id: number): void {
        this.id = id;
    }
}