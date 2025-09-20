const emailReg = /^[a-z0-9]+(\.[a-z0-9]+)*@gmail\.com$/


const email = 'mosarofhossain8207@gmail.com'

emailReg.test(email) ? console.log('valid email') : console.log('invalid email')