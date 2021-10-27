function isHamsterObject(maybe) {
    if ((typeof maybe) !== 'object') {
        return false
    }

    let keys = Object.keys(maybe)
    if (!keys.includes('name') ||
        !keys.includes('age') ||
        !keys.includes('favFood') ||
        !keys.includes('loves') ||
        !keys.includes('imgName') ||
        !keys.includes('wins') ||
        !keys.includes('defeats') ||
        !keys.includes('games')) {
        return false
    }

    return true
}

function isUpdatedHamster(maybe) {
    if ((typeof maybe) !== 'object') {
        return false
    }


    let keys = Object.keys(maybe)
    if (!keys.includes('wins') ||
        !keys.includes('games')) {
        return false
    }

     return true
}


    function isMatch(maybe) {
        if ((typeof maybe) !== 'object') {
            return false
        }
    
    
        let keys = Object.keys(maybe)
        if (!keys.includes('winnerId') ||
            !keys.includes('loserId')) {
            return false
        }
    
         return true
    }
module.exports = { isHamsterObject, isUpdatedHamster, isMatch }