module.exports = encrypt;

function encrypt(date, length){
	var time = date.getTime();
	var random = Math.floor((Math.random() * 100) + 1); // create a random number
	var result = time.toString() + length.toString() + random.toString();
	return Number(result)
}

