var ren = 1;
$(function() {
    /*объявление переменных -------------------------------------------------------------*/
    var gamer;
    var selected = [];
    var questions = [
        {pict: '1', carbon: 8250, url: './images/card05.png'},
        {pict: '2', carbon: 13, url: './images/card07.png'},
        {pict: '3', carbon: 53, url: './images/card08.png'},
        {pict: '4', carbon: 350, url: './images/card09.png'},
        {pict: '5', carbon: 1150, url: './images/card10.png'},
        {pict: '6', carbon: 3200, url: './images/card11.png'},
        {pict: '7', carbon: 3910, url: './images/card12.png'},
        {pict: '8', carbon: 507, url: './images/card13.png'},
        {pict: '9', carbon: 1755, url: './images/card14.png'},
        {pict: '10', carbon: 1000, url: './images/card15.png'},
        {pict: '11', carbon: 470, url: './images/card16.png'},
        {pict: '12', carbon: 71, url: './images/card17.png'},
        {pict: '13', carbon: 2600, url: './images/card18.png'},
        {pict: '14', carbon: 500, url: './images/card19.png'},
        {pict: '15', carbon: 320, url: './images/card20.png'},
        {pict: '16', carbon: 5675, url: './images/card21.png'},
        {pict: '17', carbon: 126, url: './images/card22.png'},
        {pict: '18', carbon: 564, url: './images/card23.png'},
        {pict: '19', carbon: 10983, url: './images/card24.png'},
        {pict: '20', carbon: 342, url: './images/card25.png'},
        {pict: '21', carbon: 117, url: './images/card26.png'},
        {pict: '22', carbon: 275, url: './images/card27.png'},
        {pict: '23', carbon: 5400, url: './images/card28.png'},
        {pict: '24', carbon: 396, url: './images/card29.png'},
        {pict: '25', carbon: 1628, url: './images/card30.png'},
        {pict: '26', carbon: 452, url: './images/card31.png'},
        {pict: '27', carbon: 2750, url: './images/card32.png'},
        {pict: '28', carbon: 2115, url: './images/card33.png'},
        {pict: '29', carbon: 44, url: './images/card34.png'},
        {pict: '30', carbon: 1200, url: './images/card35.png'}
    ];
    var questionsSelected = [];
    var num1;
    var num2;
    //var customWindow = window.open('', '_blank', '');

    /*код------------------------------------------------------------------------------------*/
    gamer= JSON.parse(sessionStorage.getItem('user'));
    if(gamer == null || gamer.state=="newgamer"){}
    else if(gamer.state==1){
        getTenRandom();
        ten();
        var name = gamer.name;
        var team = gamer.team;
        var mail = gamer.mail;
        var arr= questionsSelected;
        gamer = new Gamer(1, name, team, mail,0,0,0, arr);
        sessionStorage.setItem('user', JSON.stringify(gamer));
        $('.btn-next').remove();
        $('body').addClass('twocard02');
        containeHtml('.cards-holder', '#form2');
    }
    else if(gamer.state==2) {
        gamer = JSON.parse(sessionStorage.getItem('user'));
        --gamer.round;
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderStateOne();
    }
    else if(gamer.state==3) {
        containeHtml('.cards-holder', '#form3');
        gamer = JSON.parse(sessionStorage.getItem('user'));
        $('#im1').attr('src', gamer.arr[gamer.counter].url);
        $('.btns').css('display', 'none');
        ++gamer.counter;
        ++gamer.counter;
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderStateTwo();
    }
    else if(gamer.state=='up'){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        --gamer.counter;
        --gamer.round;
        if(gamer.win){--gamer.score;}
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderUp();
    }
    else if(gamer.state=='down'){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        --gamer.counter;
        --gamer.round;
        if(gamer.win){--gamer.score;}
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderDown();
    }
    else if(gamer.state=='winner'){renderWin()}
    else if(gamer.state=='leaderboard'){renderLeaderBoard()}
    else if(gamer.state==3.1) {
    //alert('3.1')
        containeHtml('.cards-holder', '#form3');
        $('#im1').attr('src', gamer.arr[gamer.counter].url);
        $('.btns').css('display', 'none');
        ++gamer.counter;
        //var name = gamer.name;
        $('#user').text(gamer.name);
        $('#round').text(gamer.round);
        $('#score').text(gamer.score);
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderStateTwo();
    }
    else if(gamer.state==3.2) {
        //alert('3.2')
        containeHtml('.cards-holder', '#form3');
        $('#im1').attr('src', gamer.arr[gamer.counter].url);
        $('.btns').css('display', 'none');
        //++gamer.counter;
        //var name = gamer.name;
        $('#user').text(gamer.name);
        $('#round').text(gamer.round);
        $('#score').text(gamer.score);
        sessionStorage.setItem('user', JSON.stringify(gamer));
        renderStateTwo();
    }
    /*объявление функций-----------------------------------------------------------------*/
    function getTenRandom(){
        var total = 30;
        var count = 11;
        var numbers = [];
        for(var i = 0; i < total; i++){
            numbers.push(i);
        }
        function getRandom(){
            var index = Math.floor(Math.random() * total);
            if (selected.indexOf(index) < 0){
                selected.push(index);
            }
            if (selected.length < count){
                getRandom();
            }
        }
        getRandom();
    }
    function ten (){
        for(var i=0; i<11;i++){
            questionsSelected.push(questions[selected[i]]);
        }


    }
    function containeHtml(card, form){
        var a = $(card);
        var b = $($(form).html());
        a.html(b);
    }
    function Gamer(state, name, team, mail,round, score, counter,arr){
        this.state = state,
          this.name = name,
          this.team = team,
          this.mail = mail,
          this.round= round,
          this.score= score,
          this.counter= counter,
          this.arr= arr
    }
    function renderTwo(){
        var a = $('#input_name');
        var c = $('#input_email');
        d = c.val();
        var regexp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i;
        f=d.search(regexp);
        var b = $('.jcf-select-text> span');
        if(a.val() === ''){
            a.css('background-color', 'lemonchiffon');
            return
        }
        else{
            a.css('background-color', 'white');
        }
        if(b.text() == 'choose your team'){
            var g = $('.jcf-select');
            g.css('background-color', 'lemonchiffon');
            return
        }
        else{
            $('.jcf-select').css('background-color', 'white');
        }
        if(c.val() == ''){
            c.css('background-color', 'lemonchiffon');
            return
        }
        if(f===(-1)){
            c.css('background-color', 'lemonchiffon');
            return
        }
        else{
            c.css('background-color', 'white');
        }
        getTenRandom();
        ten();
        var name = $('#input_name').val();
        var team = $('.jcf-select-text > span').text();
        var mail = $('#input_email').val();
        var arr= questionsSelected;
        gamer = new Gamer(1, name, team, mail,0,0,0, arr);
        sessionStorage.setItem('user', JSON.stringify(gamer));
        $('.btn-next').remove();
        $('body').addClass('twocard02');
        containeHtml('.cards-holder', '#form2');

    };
    function renderStateOne(){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        gamer.state=2;
        ++gamer.round;
        containeHtml('.cards-holder', '#form3');
        $('.btns').css('display', 'none');
        $('#user').text(gamer.name);
        $('#round').text(gamer.round);
        $('#score').text(gamer.score);
        $('.btn-play2').css('display', 'block');
        if(gamer.round==1){
            $('#im1').attr('src', 'images/card01.png');
            $('#im2').attr('src', 'images/card01.png');
            gamer.counter=0;
        }
        else{
            $('#im1').attr('src', gamer.arr[gamer.counter].url);
            ++gamer.counter;
            $('#im2').attr('src', gamer.arr[gamer.counter].url);
            ++gamer.counter;
        }
        $('#im111').attr('src', gamer.arr[gamer.counter].url);
        ++gamer.counter;
        $('#im222').attr('src', gamer.arr[gamer.counter].url);
        ++gamer.counter;
        $('.win').css('display','none');
        $('.lose').css('display','none');
        $('#nextround').css('display','none');
        $('.btn-up').css('display','none');
        $('.btn-down').css('display','none');
        sessionStorage.setItem('user', JSON.stringify(gamer));
    };
    function renderStateTwo(){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        if(gamer.round==11){
            renderWin();
            return
        }
        gamer.state=3;
        --gamer.counter;
        --gamer.counter;
        sessionStorage.setItem('user', JSON.stringify(gamer));
        $('.btn-play2').css('display', 'none');

        $('#im111').attr('src', gamer.arr[gamer.counter].url);
        //++gamer.counter;
        $('#im222').attr('src', 'images/card01.png');

        $('.flipper').addClass('fl');


        function timer() {
                gamer = JSON.parse(sessionStorage.getItem('user'));
                gamer.state=3.1;
                containeHtml('.cards-holder', '#form3');
                $('.btns').css('display', 'none');
                //--gamer.counter;
                $('#im1').attr('src', gamer.arr[gamer.counter].url);
                ++gamer.counter;
                $('#im2').attr('src', 'images/card01.png');
                $('#t1').css('display', 'none');
                $('#user').text(gamer.name);
                $('#round').text(gamer.round);
                $('#score').text(gamer.score);

                sessionStorage.setItem('user', JSON.stringify(gamer));
        };
        setTimeout(timer, 1300);
        function timer1() {
            gamer = JSON.parse(sessionStorage.getItem('user'));
            $('#im222').attr('src', gamer.arr[gamer.counter].url);
            ++gamer.counter;
            gamer.state=3.2;
            $('.flipper2').addClass('fl');
            $('#btns2').css('display', 'block');
            sessionStorage.setItem('user', JSON.stringify(gamer));

        };
        setTimeout(timer1, 2800);

    };
    function renderUp(){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        gamer.state='up';
        --gamer.counter;
        --gamer.counter;

        containeHtml('.cards-holder', '#form3');
        $('#im1').attr('src', gamer.arr[gamer.counter].url);
        num1=gamer.arr[gamer.counter].carbon;
        ++gamer.counter;
        $('#im2').attr('src', gamer.arr[gamer.counter].url);
        num2=gamer.arr[gamer.counter].carbon;

        $('.btns').css('display', 'none');
        $('#im111').attr('src', gamer.arr[gamer.counter].url);
        //++gamer.counter;
        $('#im222').attr('src', gamer.arr[gamer.counter].url);
        $('#t2').css('display', 'block');
        $('#user').text(gamer.name);
        $('#score').text(gamer.score);
        $('#round').text(gamer.round);
        $('#t2').css('display', 'block');
        $('#nextround').css('display','block');

        $('.flipper').attr('class','flipper' );
        $('.flipper2').attr('class','flipper2' );

        $('.btn-up').css('display', 'none');
        $('.btn-down').css('display','none');

        $('#play').css('display', 'none');
        $('.btn-play2').css('display', 'block');

        if(gamer.round==10){
            $('#nextround').text('end game');
            $('#nextround').css('font-size', '23px');
            $('#nextround').css('line-height', '24px');
        }
        else{
            $('#nextround').css('font-size', '18px');
            $('#nextround').css('line-height', '18px');
        }

        $('.lose').css('display', 'none');
        $('.win').css('display', 'none');

        if(num2>num1){

            $('.front .win').css('display', 'block');
            ++gamer.score;
            gamer.win= true;
            $('#score').text(gamer.score);
        }else{
            $('.front .lose').css('display', 'block');
            $('#score').text(gamer.score);
            gamer.win= false;
        }
        ++gamer.round;
        ++gamer.counter;
        ++gamer.counter;
        sessionStorage.setItem('user', JSON.stringify(gamer));

    };
    function renderDown(){

        gamer= JSON.parse(sessionStorage.getItem('user'));
        gamer.state='down';
        --gamer.counter;
        --gamer.counter;


        containeHtml('.cards-holder', '#form3');
        $('#im1').attr('src', gamer.arr[gamer.counter].url);
        num1=gamer.arr[gamer.counter].carbon;
        ++gamer.counter;
        $('#im2').attr('src', gamer.arr[gamer.counter].url);
        num2=gamer.arr[gamer.counter].carbon;

        $('.btns').css('display', 'none');
        $('#im111').attr('src', gamer.arr[gamer.counter].url);
        $('#im222').attr('src', gamer.arr[gamer.counter].url);
        $('#t2').css('display', 'block');
        $('#user').text(gamer.name);
        $('#score').text(gamer.score);
        $('#round').text(gamer.round);
        $('#t2').css('display', 'block');
        $('#nextround').css('display','block');

        $('.flipper').attr('class','flipper' );
        $('.flipper2').attr('class','flipper2' );

        $('.btn-up').css('display', 'none');
        $('.btn-down').css('display','none');

        $('#play').css('display', 'none');
        $('.btn-play2').css('display', 'block');

        if(gamer.round==10){
            $('#nextround').text('end game');
            $('#nextround').css('font-size', '23px');
            $('#nextround').css('line-height', '24px');
        }
        else{
            $('#nextround').css('font-size', '18px');
            $('#nextround').css('line-height', '18px');
        }

        $('.lose').css('display', 'none');
        $('.win').css('display', 'none');

        if(num2<num1){
            $('.front .win').css('display', 'block');
            ++gamer.score;
            gamer.win= true;
            $('#score').text(gamer.score);
        }else{
            $('.front .lose').css('display', 'block');
            $('#score').text(gamer.score);
            gamer.win= false;
        }
        ++gamer.round;
        ++gamer.counter;
        ++gamer.counter;
        sessionStorage.setItem('user', JSON.stringify(gamer));

    };
    function renderWin(){
        gamer= JSON.parse(sessionStorage.getItem('user'));
        gamer.state='winner';
        containeHtml('.cards-holder', '#form4');
        $('#user').text(gamer.name);
        if(gamer.score<5){
            $('#score').text(gamer.score);
        }
        else if(gamer.score===5 || gamer.score<8){
            $('.welldone').css('display', 'none');
            $('.welldone2').css('display', 'block');
            $('#colorStar').text('silver eco medal');
            $('#star').attr('src','./images/star3.png');
            $('#scoreBest').text(gamer.score);
        }
        else if(gamer.score===8 || gamer.score===9){
            $('.welldone').css('display', 'none');
            $('.welldone2').css('display', 'block');
            $('#colorStar').text('gold eco medal');
            $('#star').attr('src','./images/star2.png');
            $('#scoreBest').text(gamer.score);
        }
        else if(gamer.score===10){
            $('.welldone').css('display', 'none');
            $('.welldone2').css('display', 'block');
            $('#colorStar').text('green eco medal');
            $('#star').attr('src','./images/star1.png');
            $('#scoreBest').text(gamer.score);
        }
        sessionStorage.setItem('user', JSON.stringify(gamer));
    };
    function renderLeaderBoard(event) {

        var data = event ? {score: gamer.score, team: gamer.team} : {};
        if (navigator.onLine) {
            $.ajax({
                url: './dashboard',
                method: 'POST',
                data: data,
                success: function (data) {
                    if (!data) {
                        return alert('ajax error');
                    }
                    var sorted = _(data).sortBy('score').reverse();
                    var tpl = _.template($('#form5').html())({data: sorted, teamName: gamer.team});

                    localStorage.setItem('lbd', JSON.stringify(sorted));

                    $('.cards-holder').html(tpl);

                    gamer = JSON.parse(sessionStorage.getItem('user'));
                    gamer.state = 'leaderboard';
                    sessionStorage.setItem('user', JSON.stringify(gamer));
                },
                error: errorHandler
            });
        }else {
            errorHandler()
        }

        function errorHandler(){
            var arr,
              defArr = [{"team":"Red team","score":0,"games":0},{"team":"Yellow team","score":0,"games":0},{"team":"Green team","score":0,"games":0},{"team":"Blue team","score":0,"games":0},{"team":"Indigo team","score":0,"games":0},{"team":"Violet team","score":0,"games":0},{"team":"Purple team","score":0,"games":0},{"team":"Pink team","score":0,"games":0},{"team":"White team","score":0,"games":0},{"team":"Grey team","score":0,"games":0}];
            try {
                arr = JSON.parse(localStorage.getItem('lbd')) || defArr;
            } catch(e) {
                arr = defArr;
            }

            //var arr
            var team = _(arr).find(function(item){
                return item.team === gamer.team;
            });

            if (event){
                team.games += 1;
                team.score += gamer.score;
                localStorage.setItem('lbd', JSON.stringify(arr));
            }

            var sorted = _(arr).sortBy('score').reverse();

            var tpl = _.template($('#form5').html())({data: sorted, teamName: gamer.team});

            $('.cards-holder').html(tpl);

            gamer = JSON.parse(sessionStorage.getItem('user'));
            gamer.state = 'leaderboard';
            sessionStorage.setItem('user', JSON.stringify(gamer));
        }
    }
    function getNewPlayer(){
        sessionStorage.clear('user');
        selected= [];
        questionsSelected= [];
        $('body').removeClass();
        containeHtml('.cards-holder', '#form7');
        $(function() {
            jcf.replaceAll();
        });

    }

    function getAgain(){
        selected= [];
        questionsSelected= [];
        $('body').removeClass();
        getTenRandom();
        ten();
        gamer= JSON.parse(sessionStorage.getItem('user'));
        var name = gamer.name;
        var team = gamer.team;
        var mail = gamer.mail;
        var arr1= questionsSelected;
        gamer = new Gamer(1, name, team, mail,0,0,0, arr1);
        sessionStorage.setItem('user', JSON.stringify(gamer));

        $(function() {
            jcf.replaceAll();
        });
        renderStateOne();
    }
    function getQuit(){
        sessionStorage.clear('user');
        selected= [];
        questionsSelected= [];
        $('body').removeClass();
        containeHtml('.cards-holder', '#form7');
        $(function() {
            jcf.replaceAll();
        });

    }

    /*обработчики событий--------------------------------------------------------------------*/

    $('.cards-holder').on('click', '.btn-next', renderTwo);
    $('.cards-holder').on('click', '.btn-play', renderStateOne);
    $('.cards-holder').on('click', '.btn-play2', renderStateTwo);
    $('.cards-holder').on('click', '.btn-up > div', renderUp);
    $('.cards-holder').on('click', '.btn-down > div', renderDown);
    $('body').on('click', '.leaderboard', renderLeaderBoard);
    $('.cards-holder').on('click', '.new', getNewPlayer);
    $('.cards-holder').on('click', '.again', getAgain);
    $('.cards-holder').on('click', '.quit', getQuit);

 ren = renderDown;
});

