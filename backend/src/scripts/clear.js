const { connect } = require('../../firestore')
const db = connect()

const HAMSTERS = 'hamsters'

clear();


async function clear() {

    const hamsterRef = db.collection(HAMSTERS)
    const hamsterSnapshot = await hamsterRef.get()

    if ( hamsterSnapshot.empty ) {
        return
    }

    hamsterSnapshot.forEach(docRef => {
        hamsterRef.doc(docRef.id).delete()
    })
}