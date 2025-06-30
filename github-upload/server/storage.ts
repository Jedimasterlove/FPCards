import { users, cardDecks, cards, type User, type InsertUser, type CardDeck, type Card, type InsertCardDeck, type InsertCard } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllCardDecks(): Promise<CardDeck[]>;
  getCardDeck(key: string): Promise<CardDeck | undefined>;
  createCardDeck(deck: InsertCardDeck): Promise<CardDeck>;
  
  getCardsByDeck(deckKey: string): Promise<Card[]>;
  getCard(id: number): Promise<Card | undefined>;
  createCard(card: InsertCard): Promise<Card>;
  updateCard(id: number, updates: Partial<Card>): Promise<Card>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cardDecks: Map<string, CardDeck>;
  private cards: Map<number, Card>;
  private currentUserId: number;
  private currentDeckId: number;
  private currentCardId: number;

  constructor() {
    this.users = new Map();
    this.cardDecks = new Map();
    this.cards = new Map();
    this.currentUserId = 1;
    this.currentDeckId = 1;
    this.currentCardId = 1;
    
    // Initialize with deck data
    this.initializeDecks();
  }

  private initializeDecks() {
    const decks: InsertCardDeck[] = [
      {
        key: "foundation",
        title: "Foundation Basics",
        subtitle: "Essential fundamentals for healthy relationships",
        description: "Build the groundwork for meaningful connections",
        color: "#A0522D",
        imageUrl: "/attached_assets/Foundations_1750725175753.png",
        order: 1
      },
      {
        key: "listening",
        title: "Empathic Listening",
        subtitle: "Master the art of truly hearing your partner",
        description: "Develop deep listening skills for better understanding",
        color: "#A0522D",
        imageUrl: "/attached_assets/Listen_1750725175753.png",
        order: 2
      },
      {
        key: "wounds",
        title: "Wounds & Fears",
        subtitle: "Navigate emotional triggers with wisdom",
        description: "Address past hurts and overcome fears together",
        color: "#8B4513",
        imageUrl: "/attached_assets/Wounds_1750725175754.png",
        order: 3
      },
      {
        key: "owning",
        title: "Owning My Part",
        subtitle: "Take responsibility and create positive change",
        description: "Foster accountability and personal growth",
        color: "#4682B4",
        imageUrl: "/attached_assets/Owning_1750725175754.png",
        order: 4
      },
      {
        key: "common",
        title: "Common Ground",
        subtitle: "Find connection through shared values",
        description: "Discover what unites you despite differences",
        color: "#228B22",
        imageUrl: "/attached_assets/Common_1750725175752.png",
        order: 5
      },
      {
        key: "about",
        title: "About These Cards",
        subtitle: "Learn about the sources and frameworks",
        description: "Understand the methodology behind Finding Peace",
        color: "#D2691E",
        imageUrl: "/attached_assets/About_1750725175750.png",
        order: 6
      }
    ];

    decks.forEach(deck => {
      const deckWithId: CardDeck = { ...deck, id: this.currentDeckId++ };
      this.cardDecks.set(deck.key, deckWithId);
    });

    // Initialize sample cards for each deck
    this.initializeCards();
  }

  private initializeCards() {
    const sampleCards: InsertCard[] = [
      // Foundation Basics Cards
      {
        deckKey: "foundation",
        title: "AEIOU - The Vowel Check-In",
        content: "Use this VOWEL Check-In regularly to strengthen emotional connection and self-awareness.\n\nJust like brushing your teeth keeps your body healthy, doing regular emotional check-ins keeps your relationships grounded, clear, and connected. Set aside intentional time—daily, weekly, or as needed—to move through each step, either on your own or with a partner.\n\n**🌟 Affirmation**\nExpress genuine appreciation or love by choosing one specific positive adjective to describe your partner's character—like 'thoughtful,' 'resilient,' or 'kind'—then name a real-life example.\n\n**👁️ Eye Gazing**\nSit comfortably, face-to-face, and look gently into each other's eyes for four minutes. Embrace any awkwardness or nervous energy that arises; that's part of deepening connection.\n\n**❓ Inquire**\nSpark meaningful dialogue by asking: 'What was the best part of your day?' and 'What was the hardest part of your day?'\n\n**🧩 Ownership**\nTake brave responsibility for your part in the relationship using: 'I want to own that I [behavior/emotion] and I can see how it affected you by [impact].'\n\n**🤝 Unite with a Ritual**\nClose your session with a deliberate physical connection—whether it's a warm hug, slow dance, hand-hold, or forehead-to-forehead moment.",
        category: "Daily Practice",
        preview: "A daily emotional check-in practice using the vowels A-E-I-O-U to strengthen connection and self-awareness...",
        order: 1
      },
      {
        deckKey: "foundation",
        title: "ATTUNE - Building Connection",
        content: "Attunement is a harmonious alignment, understanding, or sensitivity to the needs, emotions, and energies of myself and another. Through attunement I build connection and trust.\n\n**👂 Attend**\nGive your full, undivided attention to the person speaking. Set aside distractions—put down your phone, turn off notifications, and bring your focus entirely to your partner.\n\n**🔄 Turn Toward**\nUse your body to signal emotional availability. Physically orient yourself toward the other person—shoulders square, posture open, chin lifted.\n\n**💛 Understand with Empathy**\nGo beyond hearing words—seek to truly understand what your partner is feeling and needing. Ask open-ended questions like 'Can you tell me more about that?'\n\n**🧘 No BRPEs (Blame, Rescue, Protest, Escape)**\nStay grounded in the moment by resisting the urge to shift into reactive patterns. When you notice yourself becoming defensive—pause. Take a slow breath.\n\n**💞 Engage with Compassion**\nRespond to your partner's pain, frustration, or vulnerability with softness, not solutions. Let your actions and words convey care: 'That sounds really hard. I'm here.'",
        category: "Attunement",
        preview: "Learn the five steps of attunement to build deeper connection and understanding in relationships...",
        order: 2
      },
      {
        deckKey: "foundation",
        title: "Attachment Wounds",
        content: "Attachment wounds are deep emotional injuries that occur when our core needs for love, safety, and connection are unmet or violated in significant relationships—especially early in life.\n\n**Loss** – The wound of loss is caused by the death, separation, or significant absence of someone or something deeply important to you, creating a deep sense of grief and longing.\n\n**Neglect** – The wound of neglect comes from emotional, physical, or developmental needs being consistently unmet, leaving you feeling unimportant, invisible, or unworthy of care.\n\n**Rejection** – The wound of rejection arises when you feel unwanted, dismissed, or not accepted for who you are, leading to shame and a belief that something is inherently wrong with you.\n\n**Abandonment** – The wound of abandonment forms when someone who was supposed to be there for you physically or emotionally leaves or withdraws, making you feel unwanted or alone.\n\n**Betrayal** – The wound of betrayal occurs when someone you counted on breaks your trust or violates your loyalty, often leaving you feeling hurt, confused, and unsafe in relationships.\n\n**Abuse** – The wound of abuse is inflicted through emotional, physical, sexual, or verbal harm, violating your sense of safety, worth, and trust in others.",
        category: "Healing",
        preview: "Understanding the six types of attachment wounds that can affect our relationships and sense of safety...",
        order: 3
      },
      {
        deckKey: "foundation",
        title: "8 Core Needs",
        content: "Here are our eight Core Needs—essential, non-negotiable parts of being human. When we don't find healthy ways to meet these needs, we may unconsciously turn to unhealthy behaviors to try to fill the gap.\n\n**Acceptance** – The need to be embraced as we are, without judgment, conditions, or the pressure to change.\n\n**Assurance** – The need to know we are loved, valued, and not alone, even when things go wrong.\n\n**Attention & Presence** – The need to feel seen, heard, and fully engaged with by others in meaningful ways.\n\n**Autonomy** – The need to have agency and the freedom to make choices and express ourselves authentically.\n\n**Growth & Contribution** – The need to learn, improve, and make a meaningful impact in the lives of others.\n\n**Novelty & Pleasure** – The need for enjoyment, stimulation, and new experiences that bring joy and aliveness.\n\n**Safety & Security** – The need to feel physically, emotionally, and relationally protected and stable.\n\n**Significance** – The need to matter—to feel important, valued, and that our life has purpose.",
        category: "Understanding",
        preview: "Explore the eight essential human needs that drive our behaviors and relationships...",
        order: 4
      },
      {
        deckKey: "foundation",
        title: "Shadows of Shame",
        content: "The Shadows of Shame are internalized messages of shame that we can externalize as roles or personas in an attempt to protect ourselves and build resilience, often masking our pain through patterns of behavior that seek to secure love, safety, or worth.\n\n**The Judge** – The Judge says, 'You are not good enough, and neither is anyone else—everything must be criticized, corrected, or condemned.'\n\n**The Royal** – The Royal declares, 'You deserve special treatment because you are better than everyone else—rules are for other people, not you.'\n\n**The Politician** – The Politician insists, 'You must hide your true self—only say and do what keeps others happy so they do not reject you.'\n\n**The Martyr** – The Martyr whispers, 'Your needs do not matter—just keep sacrificing yourself, and maybe someday they will see your worth.'\n\n**The Impotent One** – The Impotent One sighs, 'Why even try? You are weak, incapable, and nothing you do will ever be enough.'\n\n**The Rebel** – The Rebel shouts, 'No one tells you what to do—you are on your own, and the only way to survive is to push back or walk away.'",
        category: "Self-Awareness",
        preview: "Recognize the six shame-based personas we adopt to protect ourselves and how they impact relationships...",
        order: 5
      },
      {
        deckKey: "foundation",
        title: "BRPE - Defense Responses",
        content: "The BRPEs—Blame, Rescue, Protest, and Escape—are common defense responses we use to cope with emotional discomfort or conflict. They are automatic strategies we turn to when we feel hurt, afraid, or disconnected. While they may offer short-term relief, they often reinforce disconnection and prevent authentic healing.\n\n**Blame** – The tendency to hold others responsible for our pain or problems instead of looking at our own role.\n\n**Rescue** – The impulse to fix or save others in order to avoid our own discomfort or feelings of helplessness.\n\n**Protest** – The act of whining, complaining, or expressing helplessness in a victim stance to draw attention or change.\n\n**Escape** – The urge to avoid or withdraw from painful feelings, situations, or relationships to protect ourselves from further hurt.\n\n**Recognizing Your BRPE Patterns:**\n- When do you notice yourself blaming others?\n- How do you try to rescue or fix situations?\n- What does your protest or victim stance look like?\n- How do you typically escape or avoid difficult emotions?",
        category: "Awareness",
        preview: "Understanding the four common defense responses that can block authentic connection and healing...",
        order: 6
      },
      // Empathic Listening Cards
      {
        deckKey: "listening",
        title: "Observational Reflections",
        content: "Gently reflect what you're observing with your eyes and ears. This shows that you're tuned in to their nonverbal cues and care about what's going on beneath the surface.\n\n**\"It looks like...\"**\nDescribe your partner's facial expressions, body posture, or gestures in a nonjudgmental, curious way.\nExample: \"It looks like your shoulders are tense and you're avoiding eye contact... I wonder if you're feeling overwhelmed.\"\n\n**\"It seems like...\"**\nUse feeling words to name what you think they might be experiencing emotionally. You're not telling them how they feel—you're offering a compassionate guess.\nExample: \"It seems like you might be feeling frustrated and alone.\"\n\n**\"It sounds like...\"**\nReflect on what you hear in their tone, pace, or word choice. This helps your partner feel heard not just for their words, but for the emotional tone behind them.\nExample: \"It sounds like you're really trying to stay calm, even though this is really upsetting for you.\"\n\n**Repeat the last 3–5 words**\nEcho the last few words your partner said or paraphrase the heart of what they shared. This simple tool helps them feel heard and encourages them to keep talking.\nExample: Partner: \"I just feel like I don't matter.\" You: \"You don't matter...\"",
        category: "Reflection",
        preview: "Learn to reflect what you observe and hear to help your partner feel truly seen and understood...",
        order: 1
      },
      {
        deckKey: "listening",
        title: "Emotional Inquiry",
        content: "Use these questions to step into the emotional world of the other person with curiosity and empathy.\n\n**\"Does it feel like...?\"**\nYou're not telling them how they feel—you're taking a vulnerable guess based on what you've heard or observed. Even if you're not spot on, your effort communicates care and builds emotional trust.\nExample: \"Does it feel like you're carrying this all alone?\"\n\n**\"I'm guessing that makes you feel...\"**\nThis is a soft way to reflect what you believe they might be feeling in the moment. It shows that you're listening not just to their words, but to their heart.\nExample: \"I'm guessing that makes you feel really hurt and unimportant.\"\n\n**\"How does that make you feel?\"**\nWhen you're unsure what the other person is experiencing emotionally—or want to open a deeper dialogue—ask this question gently and with openness. Don't rush or fill the silence.\n\n**\"Tell me more...\"**\nUse this simple, powerful prompt to encourage the other person to go deeper or expand their story. It shows that you're interested in their experience and want to understand.\nExample: \"Tell me more about what that was like for you.\"",
        category: "Inquiry",
        preview: "Discover gentle ways to explore emotions and invite deeper sharing in conversations...",
        order: 2
      },
      {
        deckKey: "listening",
        title: "Empathic Understanding",
        content: "These phrases help you show genuine understanding and connection with the other person's perspective.\n\n**\"I can see what you mean because...\"**\nShow the speaker that you're genuinely listening and beginning to understand their perspective. Reflect back not just the facts, but also the meaning behind it.\nExample: \"I can see what you mean because from your point of view, it looked like I wasn't really there for you in that moment, and that hurt.\"\n\n**\"I can wrap my head around what you are saying because...\"**\nThis phrase acknowledges the logic or emotional reasoning behind their perspective. You don't have to agree with their interpretation, but you can honor how they arrived at their feelings.\nExample: \"I can wrap my head around what you are saying because if I thought someone was ignoring my needs, I'd probably feel rejected too.\"\n\n**\"I can relate to what you're feeling...\"**\nConnect with the emotion behind their story, even if the situation is different from your own. You're identifying with their emotional experience.\nExample: \"I can relate to what you're feeling—I've also felt that deep ache of being misunderstood. It's really hard.\"\n\n**\"I can HEAR what you ARE SAYING because...\"**\nThis phrase reinforces your effort to truly listen and comprehend—not just the words, but the intention and emotion behind them.",
        category: "Understanding",
        preview: "Learn to express empathic understanding that validates and connects with another's perspective...",
        order: 3
      },
      {
        deckKey: "listening",
        title: "Reflective Listening",
        content: "Take time to reflect back what the other person has shared to ensure understanding and show that you're actively listening.\n\n**\"What I heard you say was...\"**\nReflect back what the other person just shared, using your own words—paraphrase in a way that captures both the content and the emotional tone of what they said.\nExample: \"What I heard you say was that when I didn't call you back, it made you feel like you weren't important to me.\"\n\n**\"Did I get it right?\"**\nAfter you paraphrase, check in with the speaker to make sure your reflection was accurate. This is a moment of humility—offering them the chance to correct you if something was misunderstood.\nExample: \"Did I get it right, or am I missing something?\"\n\n**\"Did I miss anything?\"**\nInvite them to add anything you may not have captured. Sometimes people say more in body language or tone than they do in words, and this question shows you care about their whole message.\nExample: \"Did I miss anything important that you still want me to hear?\"\n\n**Follow-up**\nOnce they respond, briefly summarize or reflect again to show you've taken it in. It's not about being perfect—it's about being open and willing to listen again.",
        category: "Reflection",
        preview: "Master the art of reflective listening to ensure understanding and build deeper connection...",
        order: 4
      },
      // Wounds & Fears Cards
      {
        deckKey: "wounds",
        title: "When I Hurt",
        content: "Ask permission to share my hurt\nBefore diving into your feelings, gently ask: 'Is now a good time for me to share something that has been on my heart?' This helps create emotional safety and signals that you are seeking connection, not conflict.\n\n**What are the facts and the wound?**\nClearly state what you saw or heard (stick to the observable facts), and name the attachment wound that was activated—such as rejection, abandonment, betrayal, or neglect.\nExample: 'When you walked away while I was speaking, it bumped up against my abandonment wound.'\n\n**My alarming conclusion was...**\nName the story your mind told you in that moment—what you assumed, feared, or believed about yourself, the other person, or the relationship.\nExample: 'My alarming conclusion was that I do not matter and I am always too much.'\n\n**As a result, I felt...**\nIdentify and express the emotions you experienced, and if possible, describe how those feelings showed up in your body.\nExample: 'I felt anxious and invisible. My chest tightened, and I could not think clearly.'\n\n**It reminded me of when...**\nConnect the current experience to past attachment trauma or unresolved pain.\nExample: 'It reminded me of being a kid and having no one listen when I cried.'\n\n**Ask what I need for healing**\nName a specific, reasonable request that could help soothe your pain and foster reconnection.",
        category: "Communication",
        preview: "Learn how to share emotional pain in a way that invites connection rather than defensiveness...",
        order: 1
      },
      {
        deckKey: "wounds",
        title: "When You Hurt",
        content: "Use this card when someone you care about has shared emotional pain, disappointment, or an attachment wound. Your role in this moment is not to fix, defend, or explain—but to be present, responsive, and kind.\n\n**'When I hear you share this, I feel...'**\nLet them know you are emotionally impacted by their truth. This helps you join them, not just observe from a distance.\nYou might say: 'I feel sad that I contributed to your pain.' or 'I feel moved by how bravely you are expressing this.'\n\n**'When I see you suffer, I want to...'**\nTake a moment to acknowledge how their pain affects you. This is not about centering yourself—it is about showing tenderness and empathic concern.\nYou might say: 'When I see you hurting, I want to hold you.' or 'I want to reach out, slow down, and make space for your pain.'\n\n**'I am hearing you need...'**\nReflect their need back to them as clearly and gently as you can. Even if they did not state it directly, try to identify the longing underneath their words.\nYou might say: 'I hear you need reassurance that you matter to me.' or 'It sounds like you are needing comfort and acknowledgment right now.'\n\n**Can I Meet This Need?**\nBe honest, kind, and humble. Sometimes the need is simple. Sometimes it is big. What matters most is your willingness to take it seriously.\nYou might say: 'Yes, I can do that. I want to be part of your healing.' or 'I want to meet that need, but I also know I have limitations. Can we explore ways I can still support you?'",
        category: "Response",
        preview: "Guidelines for responding with compassion when someone shares their emotional pain with you...",
        order: 2
      },
      {
        deckKey: "wounds",
        title: "Darling, I Suffer",
        content: "A compassionate way to share emotional pain without blame or attack. Use this framework to speak from the heart—acknowledging your feelings, triggers, and unmet needs while inviting connection and repair.\n\n**1. State the Facts**\nBegin with observable, neutral facts (what was said or done—not your interpretation). This softens defensiveness and keeps the nervous system regulated.\nExample: 'Earlier today, when I reached out and did not hear back from you until late tonight...'\n\n**2. My Attachment Wound Was Triggered**\nShare which of your attachment wounds was activated (Abandonment, Rejection, Neglect, Betrayal, Loss, or Abuse), and connect it to a deeper longing.\nExample: 'That moment activated my abandonment wound. What I longed for was a sense that I mattered and was not alone in that moment.'\n\n**3. The Story My Shadows Start Telling Me...**\nName the internalized Shadows of Shame messages that start spinning in your mind when you are triggered.\nExample: 'The Judge tells me I am too needy.' or 'The Rebel says it is safer to shut down because I will just get hurt again.'\n\n**4. And Then I Felt...**\nName the emotions that arose, both core emotions (sadness, fear) and mutated ones (anger, withdrawal, resentment).\nExample: 'I felt a wave of sadness at first. Then I got really irritated and pulled away emotionally.'\n\n**5. I am Afraid That...**\nSpeak to the vulnerable fear that is underneath your emotional response.\nExample: 'I am afraid that I do not really matter to you.' or 'I am scared that if I ask for what I need, you will pull away.'\n\n**6. What I Need Is...**\nShare the unmet core need and a specific behavior or request that would help you feel safer, seen, or more connected.\n\n**7. When This Wound Was Formed, What I Longed For Was...**\nOffer context—where this wound originated and the unmet longing that still lingers.",
        category: "Expression",
        preview: "A structured approach to sharing emotional pain that invites compassion and connection...",
        order: 3
      },
      {
        deckKey: "wounds",
        title: "Darling, You Suffer",
        content: "When someone shares their pain with you, your role is not to fix, defend, or explain—it is to witness with compassion. Use these prompts to guide your response when you are unsure what to say.\n\n**1. State the Facts**\nReflect back the neutral, observable facts of what they experienced. This shows you were listening and helps ground the conversation.\nExample: 'When you reached out and did not get a response from me all day...' or 'When I walked away during our conversation...'\n\n**2. Their Attachment Wound**\nName the attachment wound they described (or that you can infer), and try to imagine what it feels like from their perspective.\nExample: 'It sounds like that really triggered your abandonment wound. I imagine that felt really lonely or scary inside.'\n\n**3. Their Shadows Stories**\nReflect on the Shadows of Shame they mentioned (or appeared to be carrying). Give the Shadow a name and a voice to help externalize the shame.\nExample: 'I can hear that The Judge is loud right now, saying you are too needy or too emotional.'\n\n**4. Core Emotions**\nMirror the emotions they expressed—especially the vulnerable ones. This helps them feel understood.\nExample: 'I heard you say you felt really sad, and then maybe some anger underneath that.'\n\n**5. What You Need...**\nAcknowledge the need they shared, and reflect it with empathy. Let them know it makes sense.\nExample: 'What I hear is that you need to feel emotionally safe and reassured when things feel uncertain.'\n\n**6. What Am I Missing?**\nInvite correction or clarification to show that you are listening, not assuming.\nExample: 'Is there anything I missed?' or 'Did I get that right?'\n\n**7. Can I Meet That Need?**\nReflect honestly on what you are able to offer. You do not have to be perfect—but you do need to be honest, clear, and caring.",
        category: "Compassion",
        preview: "How to respond with compassion and presence when someone shares their emotional pain...",
        order: 4
      },
      // Owning My Part Cards
      {
        deckKey: "owning",
        title: "Clarity Process A - Ownership Statement",
        content: "Many of us never saw strong, direct, and clear communication modeled. Our truth may have been hidden, submerged, or even drowned. Instead of being authentic, we learned how to put our own feelings aside or minimize others emotions. This card assists you in speaking authentically from your truth. The purpose is to help find clarity within yourself and truly understand that what is happening is not about the other person.\n\n**Ownership Statement**\n\nMy genuine desire is to seek inner clarity and peace within. I sincerely acknowledge my part in the situation at hand. My purpose is to find a deeper understanding of what is true. I am not here to impose my belief system or Shadows of Shame on you, nor change who you are. Instead, I am committed to focusing on my personal growth and nurturing a more harmonious connection with you, myself, and the universe.\n\n**Reflection Questions:**\n- What patterns do I notice in how I communicate when triggered?\n- How can I take responsibility without taking on shame?\n- What would authentic communication look like for me in this situation?\n\n**Practice:** Before engaging in difficult conversations, take time to center yourself with this ownership statement. Let it guide you toward authentic self-reflection rather than blame or defensiveness.",
        category: "Self-Reflection",
        preview: "Learn to communicate authentically and take responsibility for your part without shame or blame...",
        order: 1
      },
      {
        deckKey: "owning",
        title: "Core Emotions & Facts",
        content: "Begin by naming what emotions were most present for you. Focus on core emotions, not mutated or reactive expressions.\n\n**❤️ Core Emotions**\nCore Emotions: Anger, Fear, Sadness, Joy\n(Optional additions: Disgust, Surprise, or Shame)\n\n**Questions to explore:**\n- What emotion(s) did I feel at the peak of the moment?\n- Where did I feel them in my body? (tight chest, clenched jaw, sinking stomach, buzzing arms)\n\nExample: 'I felt fear. My stomach tightened, and my heart was racing.'\n\n**🎥 Facts**\nDescribe what happened using only observable facts—like something that could be recorded on a security camera or heard on a microphone. Stick to 1–2 sentences. Avoid assumptions, labels, or interpretations.\n\nExample: 'I asked them a question, and they walked away without responding.' or 'They raised their voice and crossed their arms.'\n\nThis grounds your reflection and keeps you from spinning into story.\n\n**🩹 Wound & Core Belief**\nWhich of my Six Attachment Wounds was triggered? (Abandonment, Rejection, Neglect, Betrayal, Loss, or Abuse)\n\nWhat painful core belief got activated? ('I do not matter,' 'I am unlovable,' 'People always leave,' etc.)\n\nExample: 'This stirred up my Rejection wound. The core belief that showed up was: My needs are too much.'\n\nNaming the wound helps bring compassion to the part of you that is hurting.",
        category: "Awareness",
        preview: "Identify your core emotions, distinguish facts from stories, and recognize attachment wounds...",
        order: 2
      },
      {
        deckKey: "owning",
        title: "Shadows of Shame",
        content: "These are not parts of you—but internalized shame messages that try to 'protect' you by keeping you small, silent, or disconnected.\n\n**🕳️ Shadows of Shame Reflection**\n\n**Which Shadows of Shame showed up?**\n(The Judge, The Martyr, The Rebel, The Royal, The Politician, The Impotent One)\n\n**What were they saying to me?**\n(e.g., 'You are pathetic,' 'You should just shut down,' 'You are too much,' 'They should treat you better than this.')\n\n**How much did I believe them in that moment?** (scale 1–10)\n\n**What were they trying to protect me from?**\n(Vulnerability? Further rejection? Feeling invisible or powerless?)\n\n**Example:**\n'The Judge said, You are weak for even needing this. I believed it about an 8 out of 10. It was trying to protect me from feeling unworthy of love.'\n\nThis step brings insight, separation from shame, and compassion for your reactive strategies.\n\n**Healing Practice:**\nOnce you identify which Shadow showed up, try speaking to it with compassion:\n'Thank you for trying to protect me, but I do not need you to carry this burden anymore. I can handle this situation from my authentic self.'\n\n**Remember:** Shadows are learned responses, not your true nature. With awareness and practice, you can choose how to respond from your centered, authentic self.",
        category: "Healing",
        preview: "Recognize shame-based patterns and learn to respond from your authentic self rather than protective shadows...",
        order: 3
      },
      {
        deckKey: "owning",
        title: "Ownership - Self-Reflection Questions",
        content: "A comprehensive self-reflection process to examine your role in conflict and relationship patterns.\n\n**🧠 1. How much of this current energy is from transference?**\nTransference is when feelings from a past relationship (especially early caregivers) are unconsciously placed onto the present person.\n- Am I reacting to this person as if they are someone from my past?\n- Is my emotional reaction disproportionate to the current moment?\n- What unmet need or past pain might be surfacing now?\n\n**🎯 2. How much of this energy is from projection?**\nProjection is when I disown a part of myself and place it on someone else.\n- Am I accusing them of something I myself have done, feared, or felt?\n- Am I trying to avoid facing something in myself by focusing on them?\n- What truth about me might this conflict be pointing toward?\n\n**🔄 3. In which BRPEs am I engaging?**\nThe BRPEs (Blame, Rescue, Protest, Escape) are common shame-based strategies we use to avoid feeling pain or powerlessness.\n- Blame: Am I focusing all attention on their faults or wrongdoings?\n- Rescue: Am I trying to fix or manage their feelings to avoid discomfort?\n- Protest: Am I complaining or acting out instead of expressing my needs clearly?\n- Escape: Am I withdrawing, numbing, or shutting down to avoid vulnerability?\n\n**🤐 4. I am using the BRPEs to cope with how I am feeling. I do it in hopes that...**\nFinish this sentence honestly. What unconscious strategy are you using to get a need met or avoid a feeling?\n\n**🪞 5. How often do I do the very thing I am protesting or blaming my partner for?**\nThis is a humbling and powerful question.\n- Am I holding them to a standard I do not live by myself?\n- What part of me does this conflict reveal?\n- Where might I be showing up in similar ways, even if unintentional?\n\n**🧊 6. In what ways does the other person actually do the opposite of what I am blaming them for?**\nThis challenges the black-and-white thinking that can dominate conflict.\n- Have there been times they have shown up, cared, or connected?\n- Can I acknowledge a more balanced view of their behavior?\n\n**⚠️ 7. In my current emotional state, I am more likely to...**\nGet honest about your patterns in dysregulation.\n- Am I more likely to lash out, collapse, shut down, or cling?\n- Is this aligned with who I want to be in this relationship?\n- What would the most grounded version of me choose here?\n\n**🙈 8-9. What am I choosing not to see? What am I pretending to ignore?**\nThis is a call to face truths we have been avoiding.\n- Am I ignoring my own role, the other person's humanity, or a pattern I do not want to change?\n- What signals or truths have I been pushing aside?\n\n**👂 10. How well have I listened with empathy to the other person?**\nBe honest:\n- Did I let them finish their thoughts?\n- Did I ask clarifying questions or reflect their feelings?\n- Did I create space for their truth, or was I preparing my rebuttal?\n\n**🧍 11-12. How am I making this all about me? What part of this conflict is mine?**\nSometimes, we center our pain so much that we forget to see the other person as a separate human being.\n- Am I framing the whole situation only in terms of how it affects me?\n- What am I responsible for—emotionally, behaviorally, energetically?\n\n**📏 13. How much am I owning?**\nRate your ownership on a scale from 1–10. Then ask:\n- What is keeping me from fully taking responsibility?\n- What would help me feel safe enough to own more?\n- What would it look like to offer repair instead of justification?",
        category: "Self-Examination",
        preview: "A comprehensive 13-question self-reflection process to examine your role in conflicts and patterns...",
        order: 4
      },
      {
        deckKey: "owning",
        title: "The Truth",
        content: "Moving beyond shame-based beliefs to find deeper truths about yourself and your situation.\n\n**🧠 1. Are the Core Beliefs and Messages from the Shadows 100% True?**\nWhat specifically are the Shadows saying to me?\n- Is this message absolutely and completely true in all situations, for all time, with no exceptions?\n- Truth check: Is this a fact, or is it a story I have been telling myself to make sense of past pain?\n- If it is not 100% true, then it is a partial truth, distortion, or lie—crafted in a moment of survival, not empowerment.\n\n**🌿 2. What Is the Opposite of Those Negative Core Beliefs?**\nFor every shame-based belief, there is an equal and opposite truth rooted in compassion and worth.\n- If the belief is 'I am unlovable,' then the opposite might be 'I am deeply worthy of love and belonging.'\n- If the belief is 'I am a failure,' the truth might be 'I am learning and growing with every experience.'\n- Write the opposite statement, even if it feels hard to believe at first.\n\n**💞 3. Would You Ever Say What the Shadows Say to Someone You Love?**\nIf your friend, partner, or child were in your shoes, would you say to them the things you are saying to yourself?\n- Would you tell them they are unworthy, broken, or too much?\n- If not, then why do those messages get a pass when directed at you?\n- What would I say to someone I love who is struggling with the same pain?\n\n**🔄 4. I Created the Core Beliefs to Explain What Happened to Me**\nAt some point, these beliefs made sense. They helped you make order out of chaos, predict danger, or keep yourself safe. But they are not truths—they are coping constructs.\n- Now, you have more resources, more awareness, and more options. You get to re-write the story.\n\n**🌬️ 5. When I Take a Deep Breath, Ground Myself, and Ask My Body: 'What Is My Real Truth?'**\nLet your body speak. Shame lives in the body—but so does wisdom, truth, and intuition.\n- Take 3 slow, intentional breaths\n- Feel your feet on the floor. Soften your jaw and shoulders\n- Ask internally: 'What is the deeper truth beneath the fear or shame?'\n\n**🔍 6. What Is the Truth—About Me? About the Other Person? About This Situation?**\nLet go of extremes. Look for both/and. This is about clarity, not perfection.\n- About Me: 'I am human. I made a mistake, but I am not a mistake. I am learning.'\n- About the Other Person: 'They may be hurting too. Their actions do not define my worth.'\n- About This Situation: 'It is painful, but it is also an opportunity for growth, healing, and choice.'",
        category: "Truth-Finding",
        preview: "Move beyond shame-based beliefs to discover deeper truths about yourself and your relationships...",
        order: 5
      },
      {
        deckKey: "owning",
        title: "Choice",
        content: "Making conscious decisions aligned with your values and highest good.\n\n**🧭 What is the best decision I can make to resolve the situation, aligned with my value system?**\nInstead of acting out of fear, anger, or shame, take a breath and return to your core values.\n- What kind of person do I want to be in this moment?\n- What virtues matter most to me—kindness, truth, compassion, accountability, love, courage?\n- What response reflects my integrity, even if it is hard?\n\n**💞 What choice can I make that will be in my best interest AND in the best interest of the people whom I love?**\nThis is not about self-sacrifice or selfishness—it is about finding the intersection of mutual care.\n- What response honors both my needs and the dignity of the other person?\n- What choice supports emotional safety and repair, not just for them, but for me too?\n- What brings me closer to connection instead of deeper into protection?\n\n**☮️ What choice will bring me the greatest sense of peace and connection?**\nAsk:\n- What decision brings long-term peace, not just short-term relief?\n- Will I feel proud of how I showed up later?\n- What choice fosters authentic connection with myself and others—even if it is vulnerable?\n\n**🌱 Connecting to My Needs**\n\n**🙏 As I connect with my truth, what I need is...**\nTake a moment to move inward. Place a hand on your heart or belly. Breathe. Then ask:\n- What do I truly need in this moment—not what I want to do, control, or fix—but what I deeply need?\n- Is it safety, reassurance, rest, presence, understanding, affection, space, repair?\n\n**🧩 I realize that core needs are non-negotiable.**\nIf I do not name and honor my needs in a healthy way, my Shadows of Shame will step in with survival strategies that often harm me or others.\n- My needs are not 'too much.' They are signals of my humanity.\n- I am not responsible for others meeting all my needs, but I am responsible for recognizing them and seeking healthy ways to get them met.\n\n**📋 Looking at the Core Needs card, what do I need right now?**\nReview the list of 8 Core Needs:\n• Assurance – To feel loved, wanted, and emotionally safe\n• Attention & Presence – To be seen, heard, and attended to\n• Autonomy – To have agency and freedom to make choices\n• Growth & Contribution – To feel like I am learning, evolving, and offering value\n• Novelty & Pleasure – To experience joy, fun, and healthy stimulation\n• Safety & Security – To feel physically, emotionally, and relationally safe\n• Significance – To feel like I matter and am appreciated\n• Acceptance – To feel loved as I am, without needing to change to be worthy\n\nAsk:\n- Which one(s) feel unmet right now?\n- How can I advocate for that need with courage and kindness?\n- What does it look like to take responsibility for that need without projecting it onto others?",
        category: "Decision-Making",
        preview: "Make conscious choices aligned with your values and core needs for authentic connection...",
        order: 6
      },
      {
        deckKey: "owning",
        title: "BRPE Reminder",
        content: "Use this card to remind you of the BRPEs and their impact on relationships.\n\n**Am I Blaming?**\nAm I trying to point out the faults of the other person or trying to avoid my own responsibility?\n\n**Am I Rescuing?**\nAm I trying to fix the problem or tell others my brilliant solution without first trusting they have the competence to figure it out?\n\n**Am I Protesting?**\nAm I demanding equality, fairness, or justice without first understanding their perspective?\n\n**Am I Escaping?**\nAm I checking out, shutting down, or leaving the situation because it feels unsafe?\n\n**Empathy**\nWhat is the impact of my behavior on the other person?\n\n**Reflection Questions:**\n- Which BRPE am I engaging in right now?\n- How might this behavior be affecting the other person?\n- What would it look like to move from this protective strategy to authentic connection?\n- What do I really need in this moment that I am trying to get through this BRPE?\n\n**Remember:** BRPEs are protective strategies we use when we feel threatened or overwhelmed. They are not bad—they served a purpose. But now you can choose more conscious responses that honor both your needs and the relationship.",
        category: "Awareness",
        preview: "Quick reference for recognizing Blame, Rescue, Protest, and Escape patterns in relationships...",
        order: 7
      },
      {
        deckKey: "owning",
        title: "Tough Questions",
        content: "When conflict arises, our nervous systems often go into defense mode—and our Shadows of Shame, attachment wounds, and protective behaviors can take the lead. These questions help interrupt the cycle and invite self-awareness, ownership, and compassion—so you can move from reaction to intention.\n\n**🪞 How Do I See What I Am Doing?**\nWhat am I actually saying or doing right now in this moment of conflict?\n- Am I blaming, avoiding, withdrawing, stonewalling, rescuing, escalating, or shutting down?\n- Be honest with yourself. Awareness is the first step toward change.\n\n**🩹 What Shadow Stories Am I Agreeing With to Justify What I Am Doing?**\nWhich internalized voices or beliefs are shaping my behavior right now?\n- Am I agreeing with The Judge that I must be right?\n- Is The Rebel trying to protect me by pushing the other person away?\n- Am I following The Martyr's belief that I am the only one who ever tries?\n\n**👀 How Do I Perceive Their Behavior?**\nWhat lens am I looking through? What story am I agreeing with to interpret their actions?\n- Am I assuming they do not care? That they are trying to hurt me? That they will never change?\n- Challenge the story. Is there another possible truth?\n\n**🧠 How Does the Other Party Perceive What I Am Doing?**\nIf I step into their shoes, how might they be interpreting my tone, body language, or behavior?\n- What might it feel like on the receiving end of me right now?\n- This is not about taking blame for how they feel—it is about understanding impact.\n\n**📖 What Stories Might They Be Agreeing With to Describe My Actions?**\nWhat narrative or belief system might they be pulling from?\n- Are they hearing Shadow messages like 'I am not important', 'I am always wrong', or 'I cannot trust anyone'?\n- This can help you develop empathy—even if you disagree with their interpretation.\n\n**🧩 How Might They Perceive Their Behavior?**\nWhat pain, fear, or internal narrative might be fueling their reactions?\n- What are they trying to protect themselves from? What unmet need is driving their actions?\n- We all do things for reasons. Understanding theirs can reduce judgment.\n\n**🧠 What Stories Might They Agree With to Explain Their Actions?**\nWhat beliefs or Shadow messages are they following to justify their behavior?\n- This builds compassion, not excuse-making.\n\n**🔄 How I Contribute to the Death Spiral**\nWhat is the repeating pattern or feedback loop we fall into?\n- How do my protective behaviors feed theirs—and vice versa?\n- Complete this sentence: 'The more I ____, the more they ____.'\n- Notice how both of you are reacting to wounds rather than connecting from your truths.\n\n**🛑 The Person in the Best Position to Stop the Cycle Is...**\nWho has the awareness, tools, and willingness to interrupt the spiral?\n- Right now, I am aware of the spiral, and I can choose to pause, soften, or ask a grounding question.\n- Even one small shift—eye contact, a deep breath, a kind word—can change the trajectory of the interaction.\n\n**🧭 Final Prompt**\nWhat would it look like to respond from my values instead of my wounds?\n- Return to your intention, your core needs, and your shared humanity.",
        category: "Self-Reflection",
        preview: "Challenging questions to interrupt conflict cycles and move from reaction to conscious response...",
        order: 8
      },
      // Common Ground Cards
      {
        deckKey: "common",
        title: "Safety Zone",
        content: "Use this card to create safety when you notice it is slipping.\n\n**Apologize**\nIf you identify that you have bumped the other person's wound, own it, and apologize.\n\n**Don't or Do Statements**\n- I don't want to give you the impression that... (state what you think they might be worried about)\n- I do want... (Affirm, demonstrate respect, or clarify intentions)\n\n**Practice Mindful Mirroring**\nState what you notice is happening in the situation. Focus on facts before you share the story.\n\n**Creating Safety Examples:**\n- 'I don't want to give you the impression that I don't care about this issue. I do want you to know that your feelings matter deeply to me.'\n- 'I can see that I interrupted you, and I imagine that felt dismissive. I am sorry.'\n- 'What I notice is that we both seem tense right now, and our voices are getting louder.'\n\n**When to Use This Card:**\n- When you notice the conversation becoming heated\n- When you see signs of emotional flooding or shutdown\n- When trust feels fragile or damaged\n- When you want to repair a small rupture before it becomes bigger\n\n**Remember:** Creating safety is about slowing down, acknowledging what is happening, and choosing connection over being right.",
        category: "Safety",
        preview: "Create emotional safety when conversations become heated or trust feels fragile...",
        order: 1
      },
      {
        deckKey: "common",
        title: "Apologizing",
        content: "Offer complete and heart-centered apologies. Use this guide to offer a complete and heart-centered apology—one that sees, honors, and tends to the pain you have caused. A healing apology requires presence, ownership, and compassion. It restores trust through genuine accountability and care.\n\n**1. See their suffering**\nBegin by acknowledging the pain your actions have caused. Look beyond the surface reaction to the deeper hurt underneath. Show that you can see their suffering without minimizing or defending.\nExample: 'I can see that my actions have caused you real pain.'\nYour willingness to witness their pain without defensiveness creates the foundation for healing.\n\n**2. Validate the pain**\nAffirm that their feelings are valid and understandable. Help them feel seen and heard by acknowledging that anyone would be hurt in this situation. Avoid explaining your intentions or justifying your behavior.\nExample: 'Your hurt makes complete sense. Anyone would feel this way.'\nValidation helps them feel less alone in their pain and opens the door to healing.\n\n**3. Acknowledge the impact**\nTake full responsibility for the effect of your actions, even if your intentions were different. Acknowledge how your behavior affected them emotionally, relationally, or practically. Own the impact completely.\nExample: 'I can see how my distance activated your abandonment wound, and that added to your suffering. That is on me.'\nImpact matters more than intent—own the effect without defensiveness.\n\n**4. Clarify what might help address the pain**\nAsk what they need for healing and offer to take meaningful steps to support that process. Suggest a repair if you know what would help, but also invite their input. Then, follow through.\nExample: 'What would help you feel more safe and supported right now?'\n'Going forward, I will check in with you directly rather than shutting down.'\nAmends are only healing when followed by consistent change.\n\n**5. Share how you feel about your actions**\nEnd by letting them into your own emotional process—not to shift the focus to yourself, but to show genuine care and self-reflection. Express remorse, tenderness, or grief about the impact of your behavior.\nExample: 'I feel heavy and deeply regretful about how I showed up. This is not how I want to treat someone I love.'\nWhen offered with humility, your vulnerability invites healing and reconnection.",
        category: "Repair",
        preview: "Learn to offer complete, heart-centered apologies that restore trust and connection...",
        order: 2
      },
      {
        deckKey: "common",
        title: "Me - Center Yourself",
        content: "Center yourself before difficult conversations. Before engaging in a difficult or emotionally charged conversation, pause and turn inward. This card helps you center yourself, clarify your intentions, and remember the kind of person you want to be—no matter how the other person responds.\n\n**What is My Intended Outcome?**\nBefore you speak, ask yourself:\n\n**What do I want for myself in this conversation?**\n(e.g., clarity, connection, boundaries, repair, understanding)\n\n**What do I want for the other person?**\n(e.g., to feel safe, heard, respected, not blamed or shamed)\n\n**What do I want for the relationship as a whole?**\n(e.g., to move forward, to rebuild trust, to stay emotionally connected)\n\n**Centering Questions:**\n- What kind of person do I want to be in this conversation?\n- How can I stay grounded if they become reactive?\n- What are my core values, and how do they guide my response?\n- What would love look like in this moment?\n\n**Before You Begin:**\n- Take three deep breaths\n- Feel your feet on the ground\n- Set an intention for connection over being right\n- Remember: You cannot control their response, but you can control yours\n\n**Mantras for Difficult Conversations:**\n- 'I choose curiosity over judgment'\n- 'Their reaction is about them, my response is about me'\n- 'I can stay open even when they cannot'\n- 'Connection is more important than being right'\n\n**Remember:** The goal is not to avoid conflict, but to engage from your highest self rather than your wounded parts.",
        category: "Preparation",
        preview: "Ground yourself and clarify your intentions before difficult conversations...",
        order: 3
      },
      {
        deckKey: "common",
        title: "Us - Reconnect and Get on the Same Page",
        content: "Use this card to reconnect and get on the same page. When two people are in conflict or misalignment, it is easy to focus on differences or defenses. This card guides you to explore common ground, shared emotion, and joint vision so you can co-create solutions that strengthen your bond.\n\n**What Are We Already in Agreement About?**\nEven in the midst of tension, there is almost always something you agree on.\n- Acknowledge shared intentions or values. Notice what you have both said yes to—maybe it is wanting peace, connection, healing, or just understanding.\n- Naming these agreements reminds you that you are not enemies—you are allies facing a shared challenge.\n\nExamples:\n- 'We both care about this relationship.'\n- 'We agree that this has not been working and we want to make it better.'\n- 'We both want to feel heard and safe.'\n\nWhy this matters: When you start from agreement, you begin from unity—not opposition.\n\n**What Feelings Do We Have in Common?**\nExplore what emotions you are both experiencing, even if they show up in different ways.\n- Are we both feeling scared? Misunderstood? Hurt?\n- Are we both longing for connection? Validation? Respect?\n- What emotions might be underneath the surface reactions?\n\nExamples:\n- 'Even though we are reacting differently, I think we are both feeling vulnerable.'\n- 'It sounds like we are both carrying some sadness here.'\n\nWhy this matters: Shared emotions create empathy. It is hard to stay disconnected when you realize you are both feeling similar things.\n\n**What Is It That We Want to Experience?**\nInstead of getting caught up in logistics or competing strategies, pause to clarify your shared desired experience.\n- Do we want to feel closer, calmer, more respected, more connected?\n- What kind of emotional or relational atmosphere are we trying to create together?\n\nExamples:\n- 'I want to feel more ease and safety between us.'\n- 'I think we are both trying to feel like we are working together, not against each other.'\n\nWhy this matters: A clear shared intention helps steer the conversation away from 'Who is right' and toward 'How can we get there together.'\n\n**How Many Strategies Can We Invent?**\nNow that you are on the same page about what you want to feel or experience, brainstorm how to get there.\n- Take turns suggesting options without judgment. Be playful, be creative.\n- Invite each other to build on ideas rather than critique them.\n- After brainstorming, go back and ask: 'Which of these would actually help us experience what we want?' 'Which strategies are most realistic, doable, or meaningful for both of us?'\n\nWhy this matters: This opens up possibility and partnership instead of power struggles. Multiple strategies equal more freedom and flexibility.\n\n**Are We Clear on the Goal or Outcome?**\nBefore jumping into action or problem-solving, check in:\n- Do we both understand and agree on the goal of this conversation?\n- Are we trying to resolve a specific conflict? Reconnect emotionally? Establish a boundary? Repair a rupture?\n\nExamples:\n- 'Just to check—are we both hoping this talk helps us feel more connected and understood?'\n- 'Before we move forward, are we clear on what we are trying to accomplish together?'\n\nWhy this matters: A shared goal helps keep the conversation focused and productive—and prevents going in circles.\n\n**Final Reflection**\n'If we were fully aligned in love, curiosity, and compassion—how would we handle this together?'\nLet that vision guide your choices.",
        category: "Connection",
        preview: "Find common ground and shared vision to co-create solutions that strengthen your bond...",
        order: 4
      },
      {
        deckKey: "common",
        title: "Slicing it Thinner",
        content: "Begin difficult conversations with vulnerability and care. Use this card to begin difficult conversations with vulnerability and care. These prompts help you slice a big, overwhelming truth into smaller pieces—making it safer to say, and easier to hear. Speaking even a little truth can move a relationship toward connection and healing.\n\n**I am feeling ___, and I am not sure how to...**\nFill in the blank with a core emotion (anger, fear, sadness, joy) or a confused feeling (frustrated, anxious, frozen, blank).\n\nComplete the sentence with:\n- ...express it\n- ...understand why it is coming up\n- ...talk about it without making things worse\n- ...say what I need\n\nExample: 'I am feeling overwhelmed, and I am not sure how to say what I need without sounding critical.'\n\n**I want to share something, but I am afraid...**\nName the fear, even if it feels irrational or embarrassing.\n\nPossible fears:\n- ...you will get angry\n- ...you will shut down\n- ...it will make things worse\n- ...I will sound too sensitive\n- ...you will think I am overreacting\n- ...you will leave or pull away\n- ...I will say it wrong\n\nExample: 'I want to talk about something, but I am afraid you will think I am overreacting.'\n\n**Why This Works:**\n- It acknowledges your emotional reality without blame\n- It invites curiosity rather than defensiveness\n- It shows vulnerability, which often creates safety for the other person\n- It gives permission for the conversation to be imperfect\n- It focuses on your internal experience rather than their behavior\n\n**Practice Tips:**\n- Start with the smaller, safer truth\n- Use 'I' statements to own your experience\n- Pause after sharing to let them respond\n- Remember: You don't have to say everything at once\n- Trust that small steps toward truth create momentum for deeper sharing\n\n**When You're Ready for More:**\nOnce you've shared the initial vulnerability, you can build on it:\n- 'What I'm noticing is...'\n- 'The story I'm telling myself is...'\n- 'What I'm needing right now is...'\n- 'What would help me feel safer is...'\n\nRemember: Vulnerability is courage, not weakness. When you slice your truth thinner, you make it possible for both of you to digest it.",
        category: "Vulnerability",
        preview: "Break down overwhelming truths into smaller, safer pieces for difficult conversations...",
        order: 5
      },
      // About These Cards
      {
        deckKey: "about",
        title: "Acknowledgment of Sources & Further Learning",
        content: "Learn about the frameworks behind these conversation tools.\n\nThe conversation prompts included in these cards have been thoughtfully adapted and inspired by the work of several renowned leaders in the fields of emotional intelligence, conflict resolution, communication, attachment theory, and relationship healing.\n\n**Core Contributors Include:**\n\n**Dr. Sue Johnson** – Developer of Emotionally Focused Therapy (EFT), whose work highlights the healing power of emotional bonding and secure attachment.\n\n**Chris Voss** – Former FBI hostage negotiator and author of Never Split the Difference, whose techniques teach the power of tactical empathy and high-stakes communication.\n\n**Drs. Harville Hendrix & Helen LaKelly Hunt** – Founders of Imago Relationship Therapy, emphasizing conscious communication and the healing potential within intimate partnerships.\n\n**Dr. John Gottman** – Pioneer in relationship research and author of The Seven Principles for Making Marriage Work, who has identified key behaviors that predict success or failure in long-term partnerships.\n\n**Dr. C. Terry Warner** – Founder of the Arbinger Institute, whose work explores how self-deception and justification keep us from genuine connection and accountability.\n\n**Kerry Patterson, Joseph Grenny, Ron McMillan, and Al Switzler** – Authors of Crucial Conversations, who offer practical tools for navigating emotionally charged dialogue with clarity and purpose.\n\n**Further Resources:**\n- www.iceeft.com — The International Centre for Excellence in Emotionally Focused Therapy\n- www.gottman.com — The Gottman Institute\n- arbinger.com — Arbinger Institute\n- www.imagorelationships.org — Imago Relationships International\n- www.vitalsmarts.com — Crucial Learning (formerly VitalSmarts)\n- www.blackswanltd.com — The Black Swan Group (Chris Voss)\n- www.findingpeaceconsulting.com — Resources for healing attachment wounds, based on the Finding Peace Framework by Troy L. Love, LCSW",
        category: "Resources",
        preview: "Learn about the frameworks and renowned experts whose work inspired these conversation tools...",
        order: 1
      }
    ];

    sampleCards.forEach(card => {
      const cardWithId: Card = { ...card, id: this.currentCardId++ };
      this.cards.set(cardWithId.id, cardWithId);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCardDecks(): Promise<CardDeck[]> {
    return Array.from(this.cardDecks.values()).sort((a, b) => a.order - b.order);
  }

  async getCardDeck(key: string): Promise<CardDeck | undefined> {
    return this.cardDecks.get(key);
  }

  async createCardDeck(deck: InsertCardDeck): Promise<CardDeck> {
    const id = this.currentDeckId++;
    const cardDeck: CardDeck = { ...deck, id };
    this.cardDecks.set(deck.key, cardDeck);
    return cardDeck;
  }

  async getCardsByDeck(deckKey: string): Promise<Card[]> {
    return Array.from(this.cards.values())
      .filter(card => card.deckKey === deckKey)
      .sort((a, b) => a.order - b.order);
  }

  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async createCard(card: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const newCard: Card = { ...card, id };
    this.cards.set(id, newCard);
    return newCard;
  }

  // Helper method to get all cards for seeding
  async getAllCards(): Promise<Card[]> {
    return Array.from(this.cards.values());
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllCardDecks(): Promise<CardDeck[]> {
    return await db.select().from(cardDecks).orderBy(cardDecks.order);
  }

  async getCardDeck(key: string): Promise<CardDeck | undefined> {
    const [deck] = await db.select().from(cardDecks).where(eq(cardDecks.key, key));
    return deck || undefined;
  }

  async createCardDeck(deck: InsertCardDeck): Promise<CardDeck> {
    const [newDeck] = await db
      .insert(cardDecks)
      .values(deck)
      .returning();
    return newDeck;
  }

  async getCardsByDeck(deckKey: string): Promise<Card[]> {
    return await db.select().from(cards).where(eq(cards.deckKey, deckKey)).orderBy(cards.order);
  }

  async getCard(id: number): Promise<Card | undefined> {
    const [card] = await db.select().from(cards).where(eq(cards.id, id));
    return card || undefined;
  }

  async createCard(card: InsertCard): Promise<Card> {
    const [newCard] = await db
      .insert(cards)
      .values(card)
      .returning();
    return newCard;
  }

  async updateCard(id: number, updates: Partial<Card>): Promise<Card> {
    const [updatedCard] = await db
      .update(cards)
      .set(updates)
      .where(eq(cards.id, id))
      .returning();
    return updatedCard;
  }
}

export const storage = new DatabaseStorage();
