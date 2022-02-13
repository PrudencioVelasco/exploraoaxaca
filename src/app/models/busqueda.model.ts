export interface Resultado {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          FeatureType;
    place_type:    PlaceType[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:           ID;
    text_es:      string;
    text:         string;
    wikidata?:    Wikidata;
    language_es?: Language;
    language?:    Language;
    short_code?:  ShortCode;
}

export enum ID {
    Country9933875229773450 = "country.9933875229773450",
    Place6176143655868870 = "place.6176143655868870",
    Postcode14307715888967930 = "postcode.14307715888967930",
    Postcode5894737893040720 = "postcode.5894737893040720",
    Region9077101295000300 = "region.9077101295000300",
}

export enum Language {
    Es = "es",
}

export enum ShortCode {
    MX = "mx",
    MXOax = "MX-OAX",
}

export enum Wikidata {
    Q2000066 = "Q2000066",
    Q34110 = "Q34110",
    Q96 = "Q96",
}

export interface Geometry {
    coordinates: number[];
    type:        GeometryType;
}

export enum GeometryType {
    Point = "Point",
}

export enum PlaceType {
    Poi = "poi",
}

export interface Properties {
    foursquare: string;
    landmark:   boolean;
    address?:   string;
    category:   Category;
}

export enum Category {
    HotelBarBarAlcohol = "hotel bar, bar, alcohol",
    HotelMotelTourismLodging = "hotel, motel, tourism, lodging",
}

export enum FeatureType {
    Feature = "Feature",
}
