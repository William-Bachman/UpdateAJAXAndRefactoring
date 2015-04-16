var firebaseUrl = "https://ccamplesson.firebaseio.com/"
var Contact = function (name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}
var contacts = [];

var addContact = function () {
    //var name = document.getElementById('inputName').value;
    var name = $('#inputName').val();
    var email = $('#inputEmail').val();
    var phone = $('#inputPhone').val();
    var myContact = new Contact(name, email, phone);

    postContact(myContact);

    //Clears out the inputs
    $('#inputName').val(''); $('#inputEmail').val(''); $('#inputPhone').val('');
}
var PrintContacts = function () {
    //document.getElementById('DisplayContactsHere').innerHTML = '';
    $('#DisplayContactsHere').html('');
    var elemString = '';
    for (var i = 0; i < contacts.length; i++) {

    }
    $('#DisplayContactsHere').html(elemString);
}

var postContact = function (data) {
    var request = new XMLHttpRequest();
    request.open('POST', firebaseUrl + '.json', true);
    request.onload = function () {
        if (this.status < 400 && this.status >= 200) {
            var response = JSON.parse(this.response);
            data.key = response.name;
            contacts.push(data);
            PrintContacts();
        }
        else {
            console.log(this.response);
        }
    }
    request.send(JSON.stringify(data));
}