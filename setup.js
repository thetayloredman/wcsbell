const disabledcb = '<input type="checkbox" onclick="return false;" />';
const enabledcb = '<input type="checkbox" onclick="return false;" checked />'
document.getElementById("root").innerHTML = `<h1>WCSBell Setup</h1>
<h2>Let's get you set up!</h2>
<div id="status">
    <h2>Current Status</h2>
    <div>
        <ol>
            <li><input type="checkbox" onclick="return false;" /> <i></i></li>
        </ol>
    </div>
</div>`;
