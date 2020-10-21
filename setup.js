(function () {
    document.getElementById("root").innerHTML = `<link rel="stylesheet" type="text/css" href="/style.css" />
<h1>WCSBell Setup</h1>
<h2>Let's get you set up!</h2>
<div id="shameless-plug">
    <h2>Powered by <div style="background-image: url('/enmap-logo.png'); background-repeat: no-repeat; background-size: contain;">&nbsp;</div> by <i>Evie.Codes</i></h2>
    <h3>Check out Enmap here: <a href="https://evie.dev/enmap/bbhc">Enmap</a></h3>
</div>
<div id="status">
    <h2>Current Status</h2>
    <div>
        <ol id="st-list">
        </ol>
    </div>
</div>
<div>
    <h2><span id="mode">Loading...</span> <i>(<code id="s-at">?</code>/<code id="s-rem">?</code>)</i></h2>
</div>`;

    let at = document.getElementById('s-at');
    let rem = document.getElementById('s-rem');
    let st = document.getElementById('mode');
    let ls = document.getElementById('st-list');

    const steps = [
        'Set a Password',
        'Add your Bell Sound',
        'Add your Bell Times',
        'View a shameless plug'
    ];

    const TOTAL_SETUP_STEPS = steps.length;

    rem.innerHTML = TOTAL_SETUP_STEPS;
    at.innerHTML = 1;

    let ct = 0;
    for (const item of steps) {
        ct++;
        let elem = document.createElement('li');
        elem.innerHTML = `<input type="checkbox" onclick="return false;" id="cb-${ct}" /> <i>${item}</i>`
        ls.appendChild(elem);
    }
})();