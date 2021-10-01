export class VenueConfigurations {
  public id: number | undefined
  public owner_id: number | undefined
  public canvas_height: string | undefined
  public canvas_width: string | undefined
  public seats: IVenueSeat[]
}

export interface IVenueSeat {
  id: number | undefined;
  venue_id: number | undefined;
  lat: string;
  lon: string
}