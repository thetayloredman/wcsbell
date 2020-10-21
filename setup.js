document.getElementById('root').innerHTML = `
<div>
    <h1>WCSBell</h1>
    <h2>Let's get you set up!</h2>
</div>
<div>
    <h1>
        Powered by
        <img src="/enmap-logo.png" alt="Enmap" style="height: 35px; position: relative; top: 5px;"/>
        by <i>Evie.Codes</i>.
    </h1>
    <h2>Check out Enmap <a href="https://evie.dev/enmap/bbhc">here</a>.</h2>
</div>
<div>
    <h1>Setup Status</h1>
    <div class="progbar">
        <div class="green" style="height: 25px; width: 0%;" id="pb"><span class="label" id="per">0%</span></div>
    </div>
</div>
<div id="main">

</div>
`;

function increaseStatusBar(ct) {
    let i1 = document.getElementById('pb');
    let i2 = document.getElementById('per');

    let ct1 = i1.style.width;
    let ct2 = i2.innerHTML;

    ct1 = ct1.replace('%', '');
    ct2 = ct2.replace('%', '');

    ct1 = Number(ct1);
    ct2 = Number(ct2);

    if (ct1 !== ct2) {
        ct2 = ct1;
    }
    if (ct1 >= 100) {
        return;
    }

    ct1 += ct;
    ct2 += ct;

    ct1 += '%';
    ct2 += '%';

    i1.style.width = ct1;
    i2.innerHTML = ct2;
}

function promptPwd() {
    document.getElementById('main').innerHTML = `<h1>Set a Password</h1>
<p>It's important to be secure! Please set a password below.</p>
<p><b>WARNING:</b> This password is sent over <b>plain HTTP</b> and is <b>NOT</b> hashed. Anyone with direct access to the database (in <code>./data/</code>) will have <b>COMPLETE ACCESS TO THE SCHEDULES</b>!</p>
<div id="pwdins">
    <input type="password" id="password-in" />
    <br />
    <button id="pwd-sh" onclick="tpd()">Toggle Password Display</button>
    <br />
    <button onclick="subm_pwd_1()" id="subm-pwd-1">Confirm</button>
</div>`;

    document.getElementById('pwd-sh').innerHTML = 'Show Password';
}

promptPwd();

let password = null;
let POSTData = { password: null };
function tpd() {
    let i1 = document.getElementById('password-in');
    let i2 = document.getElementById('pwd-sh');
    
    if (i1.attributes.type.value === 'password') {
        i1.attributes.type.value = 'text';
        i2.innerHTML = 'Hide Password';
    } else {
        i1.attributes.type.value = 'password';
        i2.innerHTML = 'Show Password';
    }
}

function subm_pwd_1() {
    password = document.getElementById('password-in').value;
    document.getElementById('pwdins').innerHTML = '<h2>Confirm Password</h2><input type="password" id="pwd-in2" /><br /><button onclick="promptPwd()" />Change Password</button><br /><button onclick="subm_pwd_2()" />Submit</button>';
};

function subm_pwd_2() {
    let pwd2val = document.getElementById('pwd-in2').value;
    if (password !== pwd2val) {
        document.getElementById('pwdins').innerHTML = `<h2>Confirmation Invalid</h2><button onclick="promptPwd()">Restart</button>`
    } else {
        increaseStatusBar(10);
        POSTData.password = password;
        document.getElementById('main').innerHTML = '';
    }
}