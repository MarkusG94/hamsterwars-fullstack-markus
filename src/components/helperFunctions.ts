import { Hamster } from "../models/Hamster"



    export function filterHamsters(hamsters: Hamster[], searchString: string): Hamster[] {
        return hamsters.filter(hamster => {
            if( searchString === '' ) {
                //visa alla hamstrar
                return true
            } else {
                //visa alla hamstrar som matchar söksträngen'
                const hamsterName = hamster.name.toLowerCase()
                const search = searchString.toLowerCase()
        
                //Leta i hela strängen
                //return title.includes(search)
                return hamsterName.includes(search)
            }
        
        })
        }