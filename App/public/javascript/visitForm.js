
var select = document.GetElementById('inlineFormCustomSelectPref');
            for(let i = 0; i < houseArray.length; i++)
            {
                // getting next address in the array
                var address = houseArray[i].houseNumber + " " + houseArray[i].street;
                select.add(new Option(address));
            }

