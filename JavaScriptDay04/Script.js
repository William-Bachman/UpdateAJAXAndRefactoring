var firebaseUrl = "https://ccamplessons.firebaseio.com/"
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
        elemString += '<tr>'
        elemString += '<td>' + contacts[i].name + '</td>'
        elemString += '<td>' + contacts[i].email + '</td>'
        elemString += '<td>' + contacts[i].phone + '</td>'
        elemString += '<td><button class="btn btn-warning" onclick="editContact(' + i + ')">Edit</button><button class="btn btn-danger" onclick="deleteContact('+i+')">Delete</button></td>'
        elemString += '</tr>'
    }
    $('#DisplayContactsHere').html(elemString);
}

var editContact = function (i) {
    document.getElementById('editName').value = contacts[i].name;
    $('#myModal').modal('toggle');
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

var getContacts = function () {
    var request = new XMLHttpRequest();
    request.open('GET', firebaseUrl + '.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response);
            for (var propName in response) {
                response[propName].key = propName;
                contacts.push(response[propName]);
            }
            PrintContacts();
        }
        else {
            console.log(this.response);
        }
    }
    request.send();
}

var deleteContact = function (i) {
    var request = new XMLHttpRequest();
    request.open('DELETE', firebaseUrl + contacts[i].key + '/.json', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            contacts.splice(i, 1);
            PrintContacts();
        }
    }
    request.send();
}

getContacts();

//response.prop
//response[prop]