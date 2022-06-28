import WithRender from './atempo.html?style=./atempo.scss';
import atempoSponsoredAd from '@assets/atempo-sponsored-ad.png';
import bonusFee from '@assets/bonus-fee-1.png';
import cyprienRoyAtempo from '@assets/Cyprien-Roy-Atempo.jpg';
import doerPool from '@assets/doer-pool-1.png';
import emojiHefting from '@assets/emoji-no-bg-manutention.png';
import emojiHouseMove from '@assets/emoji-no-bg-demenagement.png';
import emojiPaperSheets from '@assets/emoji-no-bg-papersheets.png';
import inlineLogoBlack from '@assets/logo-round-black-outline-100_1.png';
import locationScript from '@assets/location-script-1.png';

const Atempo = {
  data() {
    return {
      botreactskills: [
        "Well, perfect, let's see that then, champ' 😏",
        "Ok dude, let's test your English skills 🧠",
        'Oh... Do your best on the following test, we will see how bad it is 🙄',
      ],
      userskills: ["J'assure 😎", 'Couci-couça 🙂', 'Bof 😕'],
      firsttest: [
        'He goes to his guitar lessons ...',
        'On en profite pour vous décrire comment Dough marche ?',
        'Découvrez comment Dough fonctionne, ça va vous redonner le sourire !',
      ],
      botreactgoodanswerfirst: ['Bonne réponse ✅', "David walked by us ... he didn't know us!"],
      usergoodfirstanswer: ['1️⃣ By underground'],
      botreactbadanswerfirst: [
        'Oops, mauvaise réponse ❌ Next question :',
        "David walked by us ... he didn't know us!",
      ],
      userbadfirstanswersecond: ['2️⃣ On underground'],
      userbadfirstanswerthird: ['3️⃣ With underground'],
      userbadfirstanswerfourth: ['4️⃣ In underground'],
      botreactgoodanswersecond: ['Well done ✅'],
      usergoodsecondanswer: ['3️⃣ As if'],
      botreactbadanswersecond: ['Wrong ❌'],
      userbadsecondanswerfirst: ['1️⃣ Like'],
      userbadsecondanswersecond: ['2️⃣ As if he were'],
      userbadsecondanswerfourth: ['4️⃣ As'],
    };
  },
  computed: {
    inlineLogoBlack: function () {
      return inlineLogoBlack;
    },
    cyprienRoyAtempo: function () {
      return cyprienRoyAtempo;
    },
    emojiHouseMove: function () {
      return emojiHouseMove;
    },
    emojiPaperSheets: function () {
      return emojiPaperSheets;
    },
    emojiHefting: function () {
      return emojiHefting;
    },
    atempoSponsoredAd: function () {
      return atempoSponsoredAd;
    },
    doerPool: function () {
      return doerPool;
    },
    bonusFee: function () {
      return bonusFee;
    },
    locationScript: function () {
      return locationScript;
    },
  },
  methods: {
    openNav() {
      document.getElementById('myNav').style.height = '101vh';
    },
    closeNav() {
      document.getElementById('myNav').style.height = '0%';
    },

    goodskill10() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userskills[0]);
      let msg2 = document.createTextNode(this.botreactskills[0]);
      let msg3 = document.createTextNode(this.firsttest[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.test1-menu').addClass('appear');
      $('.test1-menu').removeClass('disappear');
      $('.test1-menu').addClass('delay-2_5s');
      $('#btn-10').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    mediumskill10() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userskills[1]);
      let msg2 = document.createTextNode(this.botreactskills[1]);
      let msg3 = document.createTextNode(this.firsttest[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.test1-menu').addClass('appear');
      $('.test1-menu').removeClass('disappear');
      $('.test1-menu').addClass('delay-2_5s');
      $('#btn-11').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badskill10() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userskills[2]);
      let msg2 = document.createTextNode(this.botreactskills[2]);
      let msg3 = document.createTextNode(this.firsttest[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.test1-menu').addClass('appear');
      $('.test1-menu').removeClass('disappear');
      $('.test1-menu').addClass('delay-2_5s');
      $('#btn-12').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    goodanswertest10() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.usergoodfirstanswer[0]);
      let msg2 = document.createTextNode(this.botreactgoodanswerfirst[0]);
      let msg3 = document.createTextNode(this.botreactgoodanswerfirst[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').removeClass('disappear');
      $('.test2-menu').addClass('appear');
      $('.test2-menu').addClass('delay-3_5s');

      $('#btn-20').css('opacity', '0');

      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest11() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadfirstanswersecond[0]);
      let msg2 = document.createTextNode(this.botreactbadanswerfirst[0]);
      let msg3 = document.createTextNode(this.botreactbadanswerfirst[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').removeClass('disappear');
      $('.test2-menu').addClass('appear');
      $('.test2-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-21').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest12() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadfirstanswerthird[0]);
      let msg2 = document.createTextNode(this.botreactbadanswerfirst[0]);
      let msg3 = document.createTextNode(this.botreactbadanswerfirst[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').removeClass('disappear');
      $('.test2-menu').addClass('appear');
      $('.test2-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-22').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest13() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadfirstanswerfourth[0]);
      let msg2 = document.createTextNode(this.botreactbadanswerfirst[0]);
      let msg3 = document.createTextNode(this.botreactbadanswerfirst[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').removeClass('disappear');
      $('.test2-menu').addClass('appear');
      $('.test2-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-23').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li3).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li3).delay(1200).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    goodanswertest23() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');

      let msg = document.createTextNode(this.usergoodsecondanswer[0]);
      let msg2 = document.createTextNode(this.botreactgoodanswersecond[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);

      div.appendChild(li);
      div.appendChild(li2);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').addClass('disappear');
      $('.test2-menu').removeClass('appear');
      $('.test2-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-20').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest21() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadsecondanswerfirst[0]);
      let msg2 = document.createTextNode(this.botreactbadanswersecond[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);

      div.appendChild(li);
      div.appendChild(li2);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').addClass('disappear');
      $('.test2-menu').removeClass('appear');
      $('.test2-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-20').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest22() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadsecondanswersecond[0]);
      let msg2 = document.createTextNode(this.botreactbadanswersecond[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);

      div.appendChild(li);
      div.appendChild(li2);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').addClass('disappear');
      $('.test2-menu').removeClass('appear');
      $('.test2-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-20').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    badanswertest24() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');

      let msg = document.createTextNode(this.userbadsecondanswerfourth[0]);
      let msg2 = document.createTextNode(this.botreactbadanswersecond[0]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);

      div.appendChild(li);
      div.appendChild(li2);

      $('.intro-menu').addClass('disappear');
      $('.intro-menu').removeClass('appear');
      $('.intro-menu').removeClass('delay-2_5s');

      $('.test1-menu').addClass('disappear');
      $('.test1-menu').removeClass('appear');
      $('.test1-menu').removeClass('delay-2_5s');

      $('.test2-menu').addClass('disappear');
      $('.test2-menu').removeClass('appear');
      $('.test2-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

      $('#btn-20').css('opacity', '0');
      $(li).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: 'auto',
        marginRight: '0',
        backgroundColor: 'rgb(0, 127, 255)',
        color: 'white',
        maxWidth: '80%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $(li2).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '350',
        marginTop: '5px',
        opacity: '0',
        display: 'table',
        marginLeft: '0',
        marginRight: 'auto',
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'black',
        maxWidth: '90%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li2).delay(600).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    show_cyprien() {
      $('#cyprien-testimonial').css('display', 'block');
      $('#paul-testimonial').css('display', 'none');
      $('#jeanne-testimonial').css('display', 'none');
      $('#annalisa-testimonial').css('display', 'none');
      $('#amandine-testimonial').css('display', 'none');
      $('#louis-testimonial').css('display', 'none');
      $('#before_show_cyprien').addClass('hover');
      $('#before_show_paul').removeClass('hover');
      $('#before_show_jeanne').removeClass('hover');
      $('#before_show_annalisa').removeClass('hover');
      $('#before_show_amandine').removeClass('hover');
      $('#before_show_louis').removeClass('hover');
    },

    show_paul() {
      $('#cyprien-testimonial').css('display', 'none');
      $('#paul-testimonial').css('display', 'block');
      $('#jeanne-testimonial').css('display', 'none');
      $('#annalisa-testimonial').css('display', 'none');
      $('#amandine-testimonial').css('display', 'none');
      $('#louis-testimonial').css('display', 'none');
      $('#before_show_cyprien').removeClass('hover');
      $('#before_show_paul').addClass('hover');
      $('#before_show_jeanne').removeClass('hover');
      $('#before_show_annalisa').removeClass('hover');
      $('#before_show_amandine').removeClass('hover');
      $('#before_show_louis').removeClass('hover');
    },

    show_jeanne() {
      $('#cyprien-testimonial').css('display', 'none');
      $('#paul-testimonial').css('display', 'none');
      $('#jeanne-testimonial').css('display', 'block');
      $('#annalisa-testimonial').css('display', 'none');
      $('#amandine-testimonial').css('display', 'none');
      $('#louis-testimonial').css('display', 'none');
      $('#before_show_cyprien').removeClass('hover');
      $('#before_show_paul').removeClass('hover');
      $('#before_show_jeanne').addClass('hover');
      $('#before_show_annalisa').removeClass('hover');
      $('#before_show_amandine').removeClass('hover');
      $('#before_show_louis').removeClass('hover');
    },

    show_annalisa() {
      $('#cyprien-testimonial').css('display', 'none');
      $('#paul-testimonial').css('display', 'none');
      $('#jeanne-testimonial').css('display', 'none');
      $('#annalisa-testimonial').css('display', 'block');
      $('#amandine-testimonial').css('display', 'none');
      $('#louis-testimonial').css('display', 'none');
      $('#before_show_cyprien').removeClass('hover');
      $('#before_show_paul').removeClass('hover');
      $('#before_show_jeanne').removeClass('hover');
      $('#before_show_annalisa').addClass('hover');
      $('#before_show_amandine').removeClass('hover');
      $('#before_show_louis').removeClass('hover');
    },

    show_amandine() {
      $('#cyprien-testimonial').css('display', 'none');
      $('#paul-testimonial').css('display', 'none');
      $('#jeanne-testimonial').css('display', 'none');
      $('#annalisa-testimonial').css('display', 'none');
      $('#amandine-testimonial').css('display', 'block');
      $('#louis-testimonial').css('display', 'none');
      $('#before_show_cyprien').removeClass('hover');
      $('#before_show_paul').removeClass('hover');
      $('#before_show_jeanne').removeClass('hover');
      $('#before_show_annalisa').removeClass('hover');
      $('#before_show_amandine').addClass('hover');
      $('#before_show_louis').removeClass('hover');
    },

    show_louis() {
      $('#cyprien-testimonial').css('display', 'none');
      $('#paul-testimonial').css('display', 'none');
      $('#jeanne-testimonial').css('display', 'none');
      $('#annalisa-testimonial').css('display', 'none');
      $('#amandine-testimonial').css('display', 'none');
      $('#louis-testimonial').css('display', 'block');
      $('#before_show_cyprien').removeClass('hover');
      $('#before_show_paul').removeClass('hover');
      $('#before_show_jeanne').removeClass('hover');
      $('#before_show_annalisa').removeClass('hover');
      $('#before_show_amandine').removeClass('hover');
      $('#before_show_louis').addClass('hover');
    },

    openNav2() {
      document.getElementById('myNav2').style.top = '0%';
    },
    closeNav2() {
      document.getElementById('myNav2').style.top = '-100vh';
    },
    closeNav3() {
      let mydiv = document.getElementById('premium-notif');
      let input = document.getElementById('email-premium');
      let message = document.getElementById('message-area');
      let h1 = document.getElementById('overlay2-h1');
      let over2 = document.getElementById('myNav2');

      mydiv.style.display = 'none';
      h1.style.display = 'none';
      input.style.display = 'none';
      message.style.display = 'inline';
      message.innerHTML = 'nous vous tiendrons au jus';
      over2.style.backgroundColor = 'rgba(0, 63, 255, 0.8';
      setTimeout(function () {
        document.getElementById('myNav2').style.top = '-100vh';
      }, 2000);
    },

    smooth() {
      {
        $('html, body').animate(
          {
            scrollTop: $('#hellodoestaffing').offset().top,
          },
          800
        );
      }
    },
    smoothie() {
      {
        $('html, body').animate(
          {
            scrollTop: $('#hellodoejobboard').offset().top,
          },
          800
        );
      }
    },
  },
};

export default WithRender(Atempo);
