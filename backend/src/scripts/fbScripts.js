const { connect } = require('../../firestore')
const db = connect()




async function getAll(collection) {


    const hamstersRef = db.collection(collection)
    const hamstersSnapshot = await hamstersRef.get()

    if (hamstersSnapshot.empty) {
        return []
    }

    const array = []

    await hamstersSnapshot.forEach(async hamster => {
        const data = await hamster.data()
        data.id = hamster.id
        array.push(data)
    })
    return array
}


async function getOne(id, collection) {
    const hamstersRef = db.collection(collection).doc(id)
    const hamstersSnapshot = await hamstersRef.get()

    return hamstersSnapshot
}

async function updateOne(id, collection, object) {

    const hamster = db.collection(collection).doc(id)
    const settings = { merge: true }
    hamster.set(object, settings)

}



const deleteOne = async (id, collection) => {

    const hamsterSnapshot = await db.collection(collection).doc(id).get() //Hämtar hamster snapshot från vald collection

    if (hamsterSnapshot.exists) { //kollar om den existerar. om den finns - .delete()
        await db.collection(collection).doc(id).delete()
        return true
    } if (!hamsterSnapshot.exists) {
        return false
    }
}


async function addOne(collection, object) {

    //Lägger till en hamster by ID
    const docRef = await db.collection(collection).add(object)
    
    //Returnerar doc id som den får i firebase
    return { id: docRef.id }
}


async function cutestHamsters(collection) {

    let hamsterSnapshot = await db.collection(collection).get()
    if (hamsterSnapshot.empty) {
        return false
    }

    let allHamsters = await getAll(collection) // Hämta alla hamstrar från collection i firestore



    //sorterar diffen i fallande ordning  på hamstrarna
    
    allHamsters.sort((a, b) => {
        let aDiff = a.wins-a.defeats
        let bDiff = b.wins-b.defeats
        return bDiff - aDiff
    })

    let maxScore = allHamsters[0].wins-allHamsters[0].defeats //högsta score
    
    let allWinners = allHamsters.filter(x => x.wins-x.defeats === maxScore) // Kolla om det finns fler hamstrar med samma score

    return allWinners
}



async function getWinners(collection) {
       let getHamsters = await db.collection(collection).orderBy('wins', 'desc').limit(5).get()  // desc - Går uppifrån och ner.
     const mostWinsHamsters = []
    getHamsters.forEach(doc => {
        mostWinsHamsters.push(doc.data());
    })
    
    const bestHamsters = [...mostWinsHamsters]
    return bestHamsters
}

async function getLosers(collection) {
    let getHamsters = await db.collection(collection).orderBy('wins', 'asc').limit(5).get()  // asc - Går nedifrån och upp.
    const mostLosingHamsters = []
   getHamsters.forEach(doc => {
       mostLosingHamsters.push(doc.data());
   })
   
   const worstHamsters = [...mostLosingHamsters]
   return worstHamsters
}

async function getMatchWinners (matchesCollection, hamsterCollection, id) {



    const hamsterRef = db.collection(hamsterCollection).doc(id) // hämtar hamstern med angivet ID
    const matches = db.collection(matchesCollection) //hämtar alla matcher

    const matchesSnapshot = await matches.get() //hämtar match snapshot
    const hamsterSnapshot = await hamsterRef.get() // hämtar hamster snapshot

    let hamstersArray = [] // tom array som skall innehålla den valda hamsterns vunna matchher

  
     matchesSnapshot.forEach( match => { // for each:ar alla matcher och sparar all data i matchData.
        const matchData = match.data()
       
        if (matchData.winnerId === id ){  //Kollar om det finns någon/några matcher som matchar hamstern som vi har angett ID på.
             hamstersArray.push(matchData) //pushar in vunna matcherna till den valda hamstern i arrayen "hamsterArray"
        }
        if(!hamsterSnapshot.exists) {
            return false
            
        }
    })
  

    

    return hamstersArray

}






module.exports = { getAll, getOne, updateOne, deleteOne, addOne, cutestHamsters, getWinners, getLosers, getMatchWinners }