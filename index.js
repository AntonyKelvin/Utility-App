const readLineSync = require('readline-sync');
const crypto = require('crypto');
const exit = 8;

//Performs a linebreak
function lineBreak(){
    console.log("-------------------------------------------------------------------------------");
}

//Checks if the element is in the options
const isValid = (options, element) => {
  if(options.indexOf(element) !== -1){
    return true;
  }
  else{
    return false;
  }
}

const urlHandler = () => {
    url = readLineSync.question('Enter URL?\n');
    const encoded_url = encodeURIComponent(url);
    const decoded_url = decodeURIComponent(encoded_url);
    console.log(`\turlEncode(${url}) -> ${encoded_url}`);
    console.log(`\turlDecode(${encoded_url}) -> ${decoded_url}`);
}

const base64Handler = () => {
  name = readLineSync.question('Enter string?\n');
  const base64 = Buffer.from(name).toString('base64');
  const ans = Buffer.from(base64,'base64').toString('ascii');
  
  console.log(`\tbase64Encode(${name}) -> ${base64}`);
  console.log(`\tbase64Decode(${base64}) -> ${ans}`);
}

const hashHandler = () => {
  const name = readLineSync.question('Enter String to hash?\n');
  const crypto = require('crypto');
  hashAlgo = readLineSync.question('Enter hashing type[md5, sha1, sha256, sha512]?\n');

  if(isValid(["md5", "sha1", "sha256", "sha512"], hashAlgo)){
    const hash = crypto.createHash(hashAlgo).update(name).digest('hex');
    console.log(`\t${hashAlgo}Hash("${name}") -> ${hash}`);
  }
  else{
    console.log(`\tEnter a valid hashing algo!`);
  }
}

const epochConverter = toDate => {
  const ans = {
    year: toDate.getFullYear(),
    month: toDate.getMonth(),
    date: toDate.getDate(),
    hours: toDate.getHours(),
    minutes: toDate.getMinutes(),
    seconds: toDate.getSeconds()
  }
  return ans;
}

const epochHandler = () => {
  const year = Number(readLineSync.question('Enter the year?\n'))
  const month = Number(readLineSync.question('Enter the month?\n'));
  const date = Number(readLineSync.question('Enter the date?\n'));
  const hours = Number(readLineSync.question('Enter hour?\n'));
  const minutes = Number(readLineSync.question('Enter minute?\n'));
  const seconds = Number(readLineSync.question('Enter seconds?\n'));

  const fullDate = new Date(year, month, date, hours, minutes, seconds);
  const epoch = fullDate.getTime();

  //Converts epoch to Date{year, month, date, hours, minutes, seconds}
  const toDate = new Date(epoch);
  const ans = JSON.stringify(epochConverter(toDate));

  console.log(`\ttoEpoch(${year}, ${month}, ${date}, ${hours}, ${minutes}, ${seconds}) -> ${epoch}`);

  console.log(`\ttoHumanDate(${epoch}) -> ${ans}`);
}

const numberHandler = () => {
    srcBase = Number(readLineSync.question('Enter number base[2/8/10/16]?\n'));
    targetBase = Number(readLineSync.question('Enter target base[2/8/10/16]?\n'));
    number = readLineSync.question('Enter number?\n');

    const numberBase10 = parseInt(number, srcBase);
    const ans = numberBase10.toString(targetBase);
    console.log(`\t${number} in base ${srcBase}`);
    console.log(`\t${ans} in base ${targetBase}`);
}

//reference: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const toHex = pixelVal => {
  const hex = pixelVal.toString(16);
  return hex.length === 1? "0" + hex : hex;
};

//reference: https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
const hexToRgb = hex => {
  const result = hex.substring(1,hex.length).match(/.{1,2}/g);
  return result ? [parseInt(result[0], 16), parseInt(result[1], 16), parseInt(result[2], 16)] : null;
}
const rgbHexHandler = () => {
  const redVal =  Number(readLineSync.question('Enter red pixel value[0-255]?\n'));
  const greenVal = Number(readLineSync.question('Enter green pixel value[0-255]?\n'));
  const blueVal = Number(readLineSync.question('Enter blue pixel value[0-255]?\n'));
  //console.log(toHex(redVal) + " " + toHex(greenVal) + " " + toHex(blueVal));
  const hexVal = "#" + toHex(redVal) + toHex(greenVal) + toHex(blueVal);
  const rgbVal = hexToRgb(hexVal);
  console.log(`\trgbToHex(${redVal},${greenVal} ,${blueVal}) -> ${hexVal}`);
  console.log(`\thexToRgb(${hexVal}) -> ${rgbVal}`);
}

const temperatureHandler = () => {
  //Each key represents a conversion.
  //For example cf means celcius to fahrenheit
  const tempConverter = {
    cf: celcius => {
      return ((celcius * (9/5)) + 32) ;
    },
    ck: celcius => {
      return (celcius + 273.15);
    },

    fc: fahrenheit => {
      return ( (fahrenheit - 32) * (5/9) );
    },

    fk: fahrenheit => {
      //Convert to celcius and then to kelvin
      return (( (fahrenheit - 32) * (5/9) ) + 273.15);
    },

    kc : kelvin => {
      return ( (kelvin - 273.15) );
    },

    kf: kelvin => {
      return (( (kelvin - 273.15)  * (9/5) ) + 32);
    }
  }
  const srcScale = readLineSync.question('Enter the source scale[celcius(c)/fahrenheit(f)/Kelvin(k)]?\n');
  const targetScale = readLineSync.question('Enter the target scale[celcius(c)/fahrenheit(f)/Kelvin(k)]?\n');
  const temp = Number(readLineSync.question('Enter the temperature?\n'));

  const key = srcScale + targetScale;
  const ans = tempConverter[key](temp);
  console.log(`\t${temp} ${srcScale} => ${ans} ${targetScale}`);
}


//Prints a welcome message
const welcomeMessage = () => {
  lineBreak();
  console.log('\t\t\t\t\t\t\t\tUtility App');
  lineBreak();
  console.log();
  console.log();
}

const printOptions = () => {
  console.log('1. URL Encoder/Decoder');
  console.log('2. Base64 Encoder/Decoder');
  console.log('3. Perform String Hashing');
  console.log('4. Epoch Converter');
  console.log('5. Number base Converter');
  console.log('6. RGB HEX Converter');
  console.log('7. Temperature Converter');
  console.log('8. Exit');
}

const handleChoice = choice => {
  switch(choice){
    case 1:
      urlHandler();
      break;
    case 2:
      base64Handler();
      break;
    case 3:
      hashHandler();
      break;
    case 4:
      epochHandler();
      break;
    case 5:
      numberHandler();
      break;
    case 6:
      rgbHexHandler();
      break;
    case 7:
      temperatureHandler();
      break;
    default:
      console.log('Please enter a valid option');
  }
}

const main = () => {
  welcomeMessage();
  while(true){
    printOptions();
    const choice = Number(readLineSync.question('Enter an option?\n'));

    if(choice == exit){
      break;
    }
    handleChoice(choice);
    lineBreak();
  }
}

main();
