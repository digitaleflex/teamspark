# Evil Stories - TeamSpark

## Épic 1 : Authentification et sécurité

### EV-001 : Tentative d'inscription avec email invalide
**En tant que** utilisateur malveillant  
**Je veux** m'inscrire avec un email invalide  
**Afin de** perturber le système d'inscription  

**Scénario :**
1. L'utilisateur entre un email invalide dans le formulaire d'inscription
2. Le système doit détecter l'invalidité de l'email
3. Le système affiche un message d'erreur approprié
4. L'inscription n'est pas traitée

**Mesures de protection :**
- Validation côté client et serveur des formats d'email
- Protection contre les injections
- Limitation des tentatives d'inscription

### EV-002 : Tentative de brute force sur la connexion
**En tant que** hacker  
**Je veux** essayer plusieurs combinaisons de mots de passe  
**Afin de** accéder à un compte utilisateur  

**Scénario :**
1. L'utilisateur tente de se connecter avec de nombreuses combinaisons
2. Le système doit détecter le pattern de brute force
3. Le système bloque temporairement l'accès
4. Des alertes de sécurité sont générées

**Mesures de protection :**
- Limitation du nombre de tentatives de connexion
- Blocage temporaire après plusieurs échecs
- Journalisation des tentatives suspectes
- Captcha après un certain nombre d'échecs

### EV-003 : Tentative d'injection SQL
**En tant que** pirate  
**Je veux** injecter du code SQL malveillant  
**Afin de** accéder aux données de la base  

**Scénario :**
1. L'utilisateur entre du code SQL dans les champs de formulaire
2. Le système doit nettoyer et valider les entrées
3. Les requêtes malveillantes sont bloquées
4. L'accès aux données reste sécurisé

**Mesures de protection :**
- Utilisation d'ORM (Prisma) pour éviter les requêtes directes
- Validation et nettoyage des entrées utilisateur
- Paramétrage des requêtes
- Surveillance des patterns d'attaque

## Épic 2 : Gestion des équipes et données

### EV-004 : Tentative d'accès non autorisé à une équipe
**En tant qu'utilisateur malveillant**  
**Je veux** accéder aux données d'une équipe dont je ne suis pas membre  
**Afin de** voler des informations sensibles  

**Scénario :**
1. L'utilisateur tente d'accéder à une URL d'équipe privée
2. Le système vérifie les permissions de l'utilisateur
3. L'accès est refusé si l'utilisateur n'est pas membre
4. L'incident est journalisé

**Mesures de protection :**
- Vérification des permissions à chaque requête
- Middleware d'authentification
- Journalisation des accès non autorisés
- Protection des routes API

### EV-005 : Tentative d'invitation de membres avec des emails invalides
**En tant qu'utilisateur malveillant**  
**Je veux** envoyer des invitations à de nombreuses adresses email invalides  
**Afin de** surcharger le système d'emails  

**Scénario :**
1. L'utilisateur entre de nombreuses adresses email invalides
2. Le système valide chaque adresse email
3. Les invitations ne sont envoyées qu'aux emails valides
4. Les tentatives d'abus sont détectées et bloquées

**Mesures de protection :**
- Validation des emails avant envoi
- Limitation du nombre d'invitations par période
- Filtrage des patterns d'abus
- Surveillance des taux d'envoi

### EV-006 : Tentative de suppression d'équipe par un membre non autorisé
**En tant que** membre d'équipe sans permissions  
**Je veux** supprimer une équipe  
**Afin de** perturber le travail de l'équipe  

**Scénario :**
1. L'utilisateur tente d'accéder à la fonction de suppression
2. Le système vérifie les permissions de l'utilisateur
3. La suppression est bloquée si l'utilisateur n'a pas les droits
4. L'incident est journalisé

**Mesures de protection :**
- Vérification des rôles et permissions
- Confirmation de suppression avec avertissement
- Journalisation des tentatives de suppression
- Restrictions basées sur les rôles

## Épic 3 : Exploitation des fonctionnalités IA

### EV-007 : Tentative de manipulation des insights IA
**En tant qu'utilisateur malveillant**  
**Je veux** manipuler les données d'entrée de l'IA  
**Afin de** générer de faux insights  

**Scénario :**
1. L'utilisateur entre des données erronées ou manipulées
2. Le système valide et nettoie les données avant traitement
3. L'IA reçoit uniquement des données valides
4. Les insights générés restent fiables

**Mesures de protection :**
- Validation des données d'entrée
- Détection des anomalies
- Filtrage des données suspectes
- Surveillance des patterns d'entrée

### EV-008 : Abus des notifications IA
**En tant qu'utilisateur malveillant**  
**Je veux** générer un grand nombre de notifications  
**Afin de** surcharger le système de notification  

**Scénario :**
1. L'utilisateur tente de déclencher de nombreuses notifications
2. Le système limite le nombre de notifications par utilisateur
3. Les tentatives d'abus sont détectées
4. Les fonctionnalités restent disponibles pour les utilisateurs légitimes

**Mesures de protection :**
- Limitation du nombre de notifications par période
- Filtrage des notifications redondantes
- Surveillance des patterns d'abus
- Priorisation des notifications importantes

## Épic 4 : Performances et disponibilité

### EV-009 : Attaque par déni de service (DoS)
**En tant qu'attaquant**  
**Je veux** surcharger le serveur avec de nombreuses requêtes  
**Afin de** rendre le service indisponible  

**Scénario :**
1. L'attaquant envoie un grand nombre de requêtes simultanées
2. Le système détecte le pattern d'attaque
3. Les requêtes excessives sont limitées ou bloquées
4. Le service reste disponible pour les utilisateurs légitimes

**Mesures de protection :**
- Limitation du nombre de requêtes par IP
- Mise en cache des réponses fréquentes
- Utilisation de CDN
- Surveillance des performances
- Mise en place de rate limiting

### EV-010 : Tentative de vol de session
**En tant qu'attaquant**  
**Je veux** voler les sessions utilisateur  
**Afin de** accéder aux comptes sans authentification  

**Scénario :**
1. L'attaquant tente de récupérer les tokens de session
2. Le système utilise des tokens sécurisés et à durée limitée
3. Les sessions sont invalidées après déconnexion
4. Les activités suspectes déclenchent des vérifications supplémentaires

**Mesures de protection :**
- Utilisation de tokens JWT sécurisés
- Durée de vie limitée des sessions
- Renouvellement automatique des tokens
- Vérification de l'IP et du user-agent
- Double authentification pour les actions sensibles