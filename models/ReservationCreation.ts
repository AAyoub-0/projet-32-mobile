export class ReservationCreation {
    id?: number | undefined;
    dateReservation: Date;
    dateRetour: Date;
    reservationMateriels: string[] | [];
    statutReservation: string;
    association: string | null;
    particulier: string | null;

    constructor(dateReservation: Date, dateRetour: Date, reservationMateriels: string[] | [], statutReservation: string, association: string | null, particulier: string | null) {
        this.dateReservation = dateReservation;
        this.dateRetour = dateRetour;
        this.reservationMateriels = reservationMateriels;
        this.statutReservation = statutReservation;
        this.association = association;
        this.particulier = particulier;
    }

    static fromJson(json: any): ReservationCreation {
        const jsonObject = JSON.parse(json);
        return new ReservationCreation(
            new Date(jsonObject.dateReservation),
            new Date(jsonObject.dateRetour),
            jsonObject.reservationMateriels,
            jsonObject.statutReservation,
            jsonObject.association,
            jsonObject.particulier
        );
    }

    static toJson(reservationCreation: ReservationCreation): string {
        return JSON.stringify(reservationCreation);
    }

    setId(id: number): void {
        this.id = id;
    }
}