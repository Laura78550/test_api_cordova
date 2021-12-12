/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
/*document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}*/

const apiUrl = 'https://laurap.alwaysdata.net/test_api/api/';
let postList = document.createElement('div');
postList.classList.add("content")
let postArticle = document.createElement('article');

// Functions
const fecthData = url => {
    return new Promise( (resolve, reject) => {
        // Get content from API with Fetch API (https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
        fetch(`${apiUrl}/${url}`)
        .then( response => {
            // Display response
            console.log(response);

            // Check response
            return response.ok
            ? response.json()
            : reject('Fetch error', response);
        })
        .then( data => {
            // Display json data
            console.log(data);

            // Resolve Promise
            return resolve(data);
        })
        .catch( fetchError => {
            return reject(fetchError);
        });
    });
};

const displayMessageList = data => {
    console.log(data)
    // Loop on collection
    for( let item of data ){
        postList.innerHTML += `
            <li>
                ${item.message}
            </li>
        `;
    };

    // Add postList in main tag
    document.querySelector('main').appendChild(postList);

};

// Wait for DOM content
document.addEventListener('DOMContentLoaded',  () => {
    // Use Promise function
    fecthData("messages")
    .then( data => displayMessageList(data) )
    .catch( err => console.log(err))
});
