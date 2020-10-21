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

