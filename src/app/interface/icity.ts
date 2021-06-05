
export class City{
    id: number=0;
    name:string;
    main:{temp: any;}
    units:{
        standard: string,
        metric: string,
        imperial: string
    };
    temp:number
    icon:string
    weather:{ description?: string; icon:any}
    constructor(name, units,  main, weather, temp, icon){
     this.weather = weather
     this.icon = icon
     this.weather.description = weather.description
     this.name = name
     this.units = units
     this.temp = temp
     this.main.temp = main.temp
    }
}