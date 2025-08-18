let names = [];
let times = [];

// यह फंक्शन सीधे टेक्स्ट एरिया से डेटा लेता है
const loggedInUser = sessionStorage.getItem('user');

        if (!loggedInUser || loggedInUser !== 'harshit') {
            // If local storage is empty or the user is not 'harshit', redirect to login page.
            window.location.href = 'index.html'; // Assuming the login file is named login.html
        }
function greet() {
    // टेक्स्ट एरिया से नाम और समय की स्ट्रिंग प्राप्त करें
    const namesString = document.getElementById('namesInput').value.trim();
    const timesString = document.getElementById('timesInput').value.trim();

    // स्ट्रिंग को लाइनों द्वारा विभाजित करें
    names = namesString.split('\n').filter(n => n.trim() !== '');
    times = timesString.split('\n').filter(t => t.trim() !== '');

    // इनपुट की जाँच करें
    if (names.length !== times.length || names.length < 2) {
        alert("कृपया सुनिश्चित करें कि नामों और समय की संख्या समान हो, और कम से कम 2 उपयोगकर्ता हों।");
        return;
    }

    // मिलान के लिए तैयारी करें
    const used = new Array(names.length).fill(false);
    const matchedPairs = [];
    const unmatchedUsers = [];

    // रैंडम पेयरिंग लॉजिक
    const shuffledIndices = Array.from({ length: names.length }, (_, i) => i).sort(() => Math.random() - 0.5);

    for (const i of shuffledIndices) {
        if (used[i]) continue;

        const available = [];
        for (const j of shuffledIndices) {
            if (i !== j && !used[j] && times[i] !== times[j]) {
                available.push(j);
            }
        }
        
        if (available.length > 0) {
            const partnerIndex = available[0];
            matchedPairs.push([i, partnerIndex]);
            used[i] = true;
            used[partnerIndex] = true;
        }
    }

    // बेमेल उपयोगकर्ताओं को खोजें
    for (let i = 0; i < names.length; i++) {
        if (!used[i]) {
            unmatchedUsers.push(i);
        }
    }

    displayResults(matchedPairs, unmatchedUsers);
}

// वेब पेज पर परिणाम प्रदर्शित करें
function displayResults(matches, unmatched) {
    const resultsDiv = document.getElementById('results');
    const matchesDiv = document.getElementById('matches');
    const unmatchedDiv = document.getElementById('unmatched');
    const statusDiv = document.getElementById('status-message');
    
    matchesDiv.innerHTML = '';
    unmatchedDiv.innerHTML = '';

    if (matches.length > 0) {
        matchesDiv.innerHTML = '<h3>Partner Matches:</h3>';
        matches.forEach(pair => {
            matchesDiv.innerHTML += `<div class="match-pair">
                ${names[pair[0]]} (${times[pair[0]]}) ↔ ${names[pair[1]]} (${times[pair[1]]})
            </div>`;
        });
    }

    if (unmatched.length > 0) {
        unmatchedDiv.innerHTML = '<h3>Remaining Valid Times:</h3>';
        unmatched.forEach(index => {
            unmatchedDiv.innerHTML += `<div class="unmatched-user">
                ${names[index]} (${times[index]})
            </div>`;
        });
        statusDiv.innerHTML = `Not matched: ${unmatched.length} user(s). Change ${Math.floor(unmatched.length / 2)} user(s) break time to retry.`;
    } else {
        statusDiv.innerHTML = 'All users successfully matched! 🎉';
    }

    document.getElementById('initial-input').style.display = 'none';
    resultsDiv.style.display = 'block';
    document.getElementById('options').style.display = 'block';
}

function startOver() {
    document.getElementById('initial-input').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('namesInput').value = '';
    document.getElementById('timesInput').value = '';
}

function exitApp() {
    document.getElementById('results').innerHTML = '<h2>Have a Nice Day! 👋</h2>';
    document.getElementById('options').style.display = 'none';
    document.getElementById('initial-input').style.display = 'none';
}
