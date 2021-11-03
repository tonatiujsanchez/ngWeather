export interface Weather{
    id: number;
    name: string;
    cod: number;
    icon: string;
    description: string;
    temp: string;
    main: string;
    minMaxTemp: MinMaxTemp;
    date: number;
}

export interface MinMaxTemp{
    date: number;
    day: number;
    month: number;
    min: number;
    max: number;
}