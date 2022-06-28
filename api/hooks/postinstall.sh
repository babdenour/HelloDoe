curl https://graph.facebook.com/v9.0/me/messenger_profile?access_token=$FB_PAGE_TOKEN \
  --header "Content-Type: application/json" \
  --request POST \
  --data-binary @- <<DATA
{
  "get_started":{
    "payload":"FACEBOOK_WELCOME"
  },
  "whitelisted_domains": [
    "https://hellodough.co",
    "https://test.hellodough.co",
    "https://hellodoe.co",
    "https://staging.hellodoe.co"
  ],
  "greeting":[
    {
      "locale":"default",
      "text":"Grâce à notre chatbot 🤖, trouve des jobs étudiants payés sous 48 heures 💰.\nHello Doe, pour ne plus jamais être en galère de tunes ✌️ \n🤳 IG | @hellodoe_"
    }
  ],
  "persistent_menu":[
    {
      "locale":"default",
      "call_to_actions":[
        {
          "title":"💰 Voir les Missions",
          "type":"postback",
          "payload":"persistent-menu-apply"
        },
        {
          "title":"🎈 Mes Infos Persos",
          "type":"postback",
          "payload":"user-change-my-infos"
        },
        {
          "title":"📑 Uploader mon CV",
          "type":"postback",
          "payload":"persistent-menu-cv"
        },
        {
          "title":"📖 Statut Auto-entrepreneur",
          "type":"postback",
          "payload":"persistent-menu-auto-entrepreneur"
        },
        {
          "title":"⌛️ Mes Candidatures",
          "type":"postback",
          "payload":"persistent-menu-jobboard-staffing"
        },
        {
          "title":"💡 Comment ça marche ?",
          "type":"postback",
          "payload":"persistent-menu-how-it-works"
        },
        {
          "title":"👍 M'abonner",
          "type":"postback",
          "payload":"persistent-menu-follow"
        },
        {
          "title":"❤️ Partager",
          "type":"postback",
          "payload":"persistent-menu-share"
        },
        {
          "title":"🔁 Redémarrer",
          "type":"postback",
          "payload":"persistent-menu-reset"
        },
        {
          "title":"🚨 Parler à un Humain",
          "type":"postback",
          "payload":"persistent-menu-get-assistance"
        }
      ]
    }
  ]
}
DATA
