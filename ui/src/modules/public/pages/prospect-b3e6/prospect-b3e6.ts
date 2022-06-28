import WithRender from './prospect-b3e6.html?style=./prospect-b3e6.scss';
import helloDoeLogo from '@assets/logo-round-black-outline-100_1.png';
import helloDoeLogoWhite from '@assets/one-line-white-logo.png';

const PropsectB3E6 = {
  data() {
    return {
      prospectCompany: ['Yogurt Factory'],
      jobCategory: ['préparation de commande'],
      jobref: [''],
      jobURL: [''],
      instaURL: ['https://www.instagram.com/p/CBDGeRsCU1_/?utm_source=ig_web_copy_link'],
      dropboxURL: ['https://bit.ly/yogurt-factory-hellodoe'],

      criteriaFirst: [
        // Première étape ://
        "l'expérience professionnelle 🎓",
      ],

      criteriaSecond: [
        // Deuxième étape ://
        'tests de langue 🏴󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿',
      ],

      restarting: [
        'Postuler 💬',
        'Avant de pouvoir enregistrer ta candidature, et comme à chaque fois chez Hello Doe, on a quelques questions à te poser 😉',
        'Tu as déjà eu une expérience en vente ou en restauration rapide ?',
      ],

      firstcriteriareplies: ['💳 Vente', '🍟 Restauration', '😎 Les Deux', '😶 Aucune'],

      secondcriteriareplies: ["😎 J'assure", '🙂 Je me débrouille', '😞 Bof bof'],

      thirdcriteriareplies: ['1️⃣ Like', '2️⃣ As if he were', '3️⃣ As if', '4️⃣ As'],

      transition: [
        'Nice 🙂',
        "D'ailleurs tu te débrouilles comment en anglais ? 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        'Voyons voir ça 😏',
        'Complète la phrase suivante en choisissant la bonne réponse :',
        "David walked by us ... he didn't know us!",
        "Well done champ' 👏",
        "Je te laisse maintenant uploader ton CV pour finaliser ta candidature, les recruteurs prendront contact avec toi si ton profil leur a tapé dans l'œil, good luck 🍀",
      ],
      redirect: [
        "Malheureusement Yogurt Factory recherche quelqu'un avec avec une expérience dans ces secteurs 😐",
        "Malheureusement on va privilégier les candidats ayant un bon niveau d'anglais 😐",
        'Oops, mauvaise réponse 🙄',
        "Malheureusement, et parce qu'il faut faire un tri, ta candidature ne sera pas retenue 😞",
        'Je te montre les autres annonces du moment ? 💰',
      ],
    };
  },
  computed: {
    helloDoeLogo: function () {
      return helloDoeLogo;
    },
    helloDoeLogoWhite: function () {
      return helloDoeLogoWhite;
    },
  },
  methods: {
    openNav() {
      document.getElementById('myNav').style.height = '101vh';
    },
    closeNav() {
      document.getElementById('myNav').style.height = '0%';
    },

    toggle1() {
      $('#step1').toggleClass('closed');
    },

    restart() {
      let li0 = document.createElement('LI');
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg0 = document.createTextNode(
        'Retentez votre chance, profitez-en, nos Doers eux ne peuvent pas 😉'
      );
      let msg = document.createTextNode(this.restarting[0]);
      let msg2 = document.createTextNode(this.restarting[1]);
      let msg3 = document.createTextNode(this.restarting[2]);

      let div = document.getElementById('myList');

      li0.appendChild(msg0);
      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li0);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('appear');
      $('.first-criteria-menu').removeClass('disappear');
      $('.first-criteria-menu').addClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');

      $('.restart-menu').addClass('disappear');
      $('.restart-menu').removeClass('appear');

      $(li0).css({
        padding: '8px 10px 8px 15px',
        borderRadius: '15px',
        fontSize: '14px',
        fontWeight: '450',
        marginTop: '40px',
        marginBottom: '20px',
        opacity: '0',
        display: 'table',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'transparent',
        color: '#6A6A6A',
        maxWidth: '60%',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)',
        position: 'relative',
      });
      $(li0).animate(
        {
          marginTop: '20px',
          opacity: '1',
        },
        500
      );

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

    reply10() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.firstcriteriareplies[0]);
      let msg2 = document.createTextNode(this.transition[0]);
      let msg3 = document.createTextNode(this.transition[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').addClass('appear');
      $('.second-criteria-menu').removeClass('disappear');
      $('.second-criteria-menu').addClass('delay-2_5s');

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

    reply11() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.firstcriteriareplies[1]);
      let msg2 = document.createTextNode(this.transition[0]);
      let msg3 = document.createTextNode(this.transition[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').addClass('appear');
      $('.second-criteria-menu').removeClass('disappear');
      $('.second-criteria-menu').addClass('delay-2_5s');

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

    reply12() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.firstcriteriareplies[2]);
      let msg2 = document.createTextNode(this.transition[0]);
      let msg3 = document.createTextNode(this.transition[1]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').addClass('appear');
      $('.second-criteria-menu').removeClass('disappear');
      $('.second-criteria-menu').addClass('delay-2_5s');

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

    reply13() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');

      let msg = document.createTextNode(this.firstcriteriareplies[3]);
      let msg2 = document.createTextNode(this.redirect[0]);
      let msg3 = document.createTextNode(this.redirect[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').addClass('appear');
      $('.second-criteria-menu').removeClass('disappear');
      $('.second-criteria-menu').addClass('delay-2_5s');

      $('.restart-menu').removeClass('disappear');
      $('.restart-menu').addClass('appear');
      $('.restart-menu').addClass('delay-3_5s');

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

    reply20() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.secondcriteriareplies[0]);
      let msg2 = document.createTextNode(this.transition[2]);
      let msg3 = document.createTextNode(this.transition[3]);
      let msg4 = document.createTextNode(this.transition[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      li4.appendChild(msg4);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);
      div.appendChild(li4);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

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
      $(li4).css({
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
      $(li4).delay(1800).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    reply21() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.secondcriteriareplies[1]);
      let msg2 = document.createTextNode(this.transition[2]);
      let msg3 = document.createTextNode(this.transition[3]);
      let msg4 = document.createTextNode(this.transition[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      li4.appendChild(msg4);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);
      div.appendChild(li4);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

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
      $(li4).css({
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
      $(li4).delay(1800).animate(
        {
          marginTop: '5px',
          opacity: '1',
        },
        500
      );
      $('#answers').scrollTop($('#answers')[0].scrollHeight);
    },

    reply22() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.secondcriteriareplies[2]);
      let msg2 = document.createTextNode(this.redirect[1]);
      let msg3 = document.createTextNode(this.redirect[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.restart-menu').removeClass('disappear');
      $('.restart-menu').addClass('appear');
      $('.restart-menu').addClass('delay-3_5s');

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

    reply30() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.thirdcriteriareplies[0]);
      let msg2 = document.createTextNode(this.redirect[2]);
      let msg3 = document.createTextNode(this.redirect[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.restart-menu').removeClass('disappear');
      $('.restart-menu').addClass('appear');
      $('.restart-menu').addClass('delay-3_5s');

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

    reply31() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.thirdcriteriareplies[1]);
      let msg2 = document.createTextNode(this.redirect[2]);
      let msg3 = document.createTextNode(this.redirect[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.restart-menu').removeClass('disappear');
      $('.restart-menu').addClass('appear');
      $('.restart-menu').addClass('delay-3_5s');

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

    reply32() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.thirdcriteriareplies[2]);
      let msg2 = document.createTextNode(this.transition[5]);
      let msg3 = document.createTextNode(this.transition[6]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.apply-menu').removeClass('disappear');
      $('.apply-menu').addClass('appear');
      $('.apply-menu').addClass('delay-3_5s');

      $('.restart-menu').removeClass('appear');
      $('.restart-menu').addClass('disappear');
      $('.restart-menu').removeClass('delay-3_5s');

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

    reply33() {
      let li = document.createElement('LI');
      let li2 = document.createElement('LI');
      let li3 = document.createElement('LI');
      let li4 = document.createElement('LI');

      let msg = document.createTextNode(this.thirdcriteriareplies[3]);
      let msg2 = document.createTextNode(this.redirect[2]);
      let msg3 = document.createTextNode(this.redirect[4]);

      let div = document.getElementById('myList');

      li.appendChild(msg);
      li2.appendChild(msg2);
      li3.appendChild(msg3);
      div.appendChild(li);
      div.appendChild(li2);
      div.appendChild(li3);

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.restart-menu').removeClass('disappear');
      $('.restart-menu').addClass('appear');
      $('.restart-menu').addClass('delay-3_5s');

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').removeClass('disappear');
      $('.third-criteria-menu').addClass('appear');
      $('.third-criteria-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

      $('.first-criteria-menu').addClass('disappear');
      $('.first-criteria-menu').removeClass('appear');
      $('.first-criteria-menu').removeClass('delay-2_5s');

      $('.second-criteria-menu').addClass('disappear');
      $('.second-criteria-menu').removeClass('appear');
      $('.second-criteria-menu').removeClass('delay-2_5s');

      $('.third-criteria-menu').addClass('disappear');
      $('.third-criteria-menu').removeClass('appear');
      $('.third-criteria-menu').removeClass('delay-3_5s');

      $('.test3-menu').removeClass('disappear');
      $('.test3-menu').addClass('appear');
      $('.test3-menu').addClass('delay-3_5s');

      $('#champ').css({
        background: 'rgba(250, 250, 250, 0)',
        backgroundSize: 'cover',
      });

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

  mounted() {
    $('#prospect-company').text(this.prospectCompany[0]);
    $('.job-category').text(this.jobCategory[0]);
    $('#dropbox-url-inner').text(this.dropboxURL[0]);
    $('.dropbox-url').attr('href', this.dropboxURL[0]);
    $('#insta-url').attr('href', this.instaURL[0]);
    $('#criteria-first').text(this.criteriaFirst[0]);
    $('#criteria-second').text(this.criteriaSecond[0]);
  },
};

export default WithRender(PropsectB3E6);
