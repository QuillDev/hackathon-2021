async function getRoomData(db, code) {

    //get the rooms category
    const rooms = db.get("rooms");

    try {
        let results = await rooms.find({code: code}, '-bigdata');

        //if results is null, return null
        if(results === null || results.length === 0){
            return null;
        }

        return results[0];
    }catch (e){
        return null;
    }

}

module.exports = getRoomData;