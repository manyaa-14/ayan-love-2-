/* =========================================
   THE AYAN FILES
   INVESTIGATION SYSTEM
========================================= */


/* =========================================
   GAME STATE
========================================= */

let evidenceVerified = 0;
let missionsCompleted = 0;
let confidentialUnlocked = false;
let restrictedUnlocked = false;

const totalEvidence = 6;
const totalMissions = 3;


/* =========================================
   BASIC SCREEN CONTROL
========================================= */

function startInvestigation() {

  document.getElementById("openingScreen").classList.remove("active");

  document.getElementById("loadingScreen").classList.add("active");

  const loadingText = document.getElementById("loadingText");
  const loadingProgress = document.getElementById("loadingProgress");

  const steps = [
    "Initializing investigation...",
    "Checking evidence...",
    "Scanning case history...",
    "Detecting suspicious levels of cuteness...",
    "Analyzing subject...",
    "ACCESS GRANTED."
  ];

  let currentStep = 0;

  const interval = setInterval(() => {

    loadingText.textContent = steps[currentStep];

    loadingProgress.style.width =
      ((currentStep + 1) / steps.length) * 100 + "%";

    currentStep++;

    if (currentStep >= steps.length) {

      clearInterval(interval);

      setTimeout(() => {

        document.getElementById("loadingScreen")
          .classList.remove("active");

        document.getElementById("dashboard")
          .classList.add("active");

      }, 900);
    }

  }, 700);
}


/* =========================================
   OPEN / CLOSE CONTENT WINDOW
========================================= */

function openSection(section) {

  const overlay = document.getElementById("contentOverlay");
  const content = document.getElementById("content");

  /* Locked sections */

  if (section === "confidential" && !confidentialUnlocked) {

    showLockedMessage(
      "CONFIDENTIAL FILES",
      "Clearance level insufficient. Complete more of the investigation."
    );

    return;
  }

  if (section === "restricted" && !restrictedUnlocked) {

    showLockedMessage(
      "RESTRICTED AREA",
      "ACCESS DENIED. Complete the entire investigation to obtain maximum clearance."
    );

    return;
  }


  overlay.classList.add("active");

  if (section === "evidence") {
    showEvidence();
  }

  if (section === "missions") {
    showMissions();
  }

  if (section === "messages") {
    showMessages();
  }

  if (section === "archive") {
    showArchive();
  }

  if (section === "confidential") {
    showConfidential();
  }

  if (section === "restricted") {
    showRestricted();
  }
}


function closeSection() {

  document.getElementById("contentOverlay")
    .classList.remove("active");

}


/* =========================================
   LOCKED MESSAGE
========================================= */

function showLockedMessage(title, message) {

  const overlay = document.getElementById("contentOverlay");
  const content = document.getElementById("content");

  overlay.classList.add("active");

  content.innerHTML = `

    <div class="file-tag">ACCESS DENIED</div>

    <h2>🔒 ${title}</h2>

    <div class="divider"></div>

    <p>${message}</p>

    <p>
      Keep investigating. There may still be clues
      hidden elsewhere in the case.
    </p>

    <button class="action-button" onclick="closeSection()">
      RETURN TO DASHBOARD
    </button>

  `;
}


/* =========================================
   EVIDENCE ROOM
========================================= */

function showEvidence() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="file-tag">EVIDENCE ROOM</div>

    <h2>🔎 COLLECTED EVIDENCE</h2>

    <p>
      The following evidence has been recovered
      during the investigation.
    </p>

    <p>
      Click each exhibit to verify it.
    </p>

    <div class="evidence-list">

      <div class="evidence-card"
           onclick="verifyEvidence(this, 1)">

        <strong>EXHIBIT 001 — EXCESSIVE CUTENESS</strong>

        <p>
          Subject has repeatedly been observed
          looking unfairly cute.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>


      <div class="evidence-card"
           onclick="verifyEvidence(this, 2)">

        <strong>EXHIBIT 002 — MAKING MANYA MISS HIM</strong>

        <p>
          Subject appears capable of causing
          unusually high levels of missing-him syndrome.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>


      <div class="evidence-card"
           onclick="verifyEvidence(this, 3)">

        <strong>EXHIBIT 003 — “MERI BACHII”</strong>

        <p>
          Repeated use of this phrase has been
          linked to suspicious levels of affection.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>


      <div class="evidence-card"
           onclick="verifyEvidence(this, 4)">

        <strong>EXHIBIT 004 — UNNECESSARY IRRITATION</strong>

        <p>
          Subject has demonstrated a consistent
          ability to irritate the investigator
          and somehow make her smile anyway.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>


      <div class="evidence-card"
           onclick="verifyEvidence(this, 5)">

        <strong>EXHIBIT 005 — BEING THERE FOR EVERYONE</strong>

        <p>
          Evidence indicates that the subject
          genuinely cares about the people around him.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>


      <div class="evidence-card"
           onclick="verifyEvidence(this, 6)">

        <strong>EXHIBIT 006 — TAKING CARE OF MANYA</strong>

        <p>
          Subject has repeatedly shown care,
          protection and affection toward the investigator.
        </p>

        <span class="evidence-status">
          UNVERIFIED
        </span>

      </div>

    </div>

  `;
}


/* =========================================
   VERIFY EVIDENCE
========================================= */

function verifyEvidence(card, number) {

  if (card.classList.contains("verified")) {
    return;
  }

  card.classList.add("verified");

  const status = card.querySelector(".evidence-status");

  status.textContent = "VERIFIED ✓";

  evidenceVerified++;

  updateProgress();

  if (evidenceVerified === totalEvidence) {

    setTimeout(() => {

      alert(
        "CLUE FOUND 🔎\n\n" +
        "Evidence collection complete.\n" +
        "A new level of clearance is available."
      );

    }, 300);
  }
}


/* =========================================
   MISSION ROOM
========================================= */

function showMissions() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="file-tag">MISSION ROOM</div>

    <h2>🧩 INVESTIGATION MISSIONS</h2>

    <p>
      Three questions stand between you and
      higher clearance.
    </p>


    <!-- MISSION 1 -->

    <div class="mission">

      <div class="mission-question">
        <strong>MISSION 01</strong><br><br>
        When did this officially begin?
      </div>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        12 JUNE 2024
      </button>

      <button class="mission-option"
        onclick="answerMission(this, true)">
        18 JUNE 2024
      </button>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        20 JUNE 2024
      </button>

    </div>


    <!-- MISSION 2 -->

    <div class="mission">

      <div class="mission-question">
        <strong>MISSION 02</strong><br><br>
        Which trip holds a special place in the case?
      </div>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        RESTAURANTS
      </button>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        SARISKA
      </button>

      <button class="mission-option"
        onclick="answerMission(this, true)">
        VAISHNO DEVI
      </button>

    </div>


    <!-- MISSION 3 -->

    <div class="mission">

      <div class="mission-question">
        <strong>MISSION 03</strong><br><br>
        What is Manya's favourite moment?
      </div>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        BIG FANCY PLANS
      </button>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        GIFTS
      </button>

      <button class="mission-option"
        onclick="answerMission(this, true)">
        OUR TIME SPENT TOGETHER
      </button>

      <button class="mission-option"
        onclick="answerMission(this, false)">
        NOTHING
      </button>

    </div>

  `;
}


/* =========================================
   ANSWER MISSION
========================================= */

function answerMission(button, correct) {

  const mission = button.closest(".mission");

  if (mission.dataset.completed === "true") {
    return;
  }

  if (correct) {

    button.classList.add("correct");

    mission.dataset.completed = "true";

    missionsCompleted++;

    updateProgress();

    setTimeout(() => {

      alert(
        "MISSION COMPLETE ✓\n\n" +
        "Correct answer.\n" +
        "Clue recovered."
      );

    }, 200);

  } else {

    button.classList.add("wrong");

    setTimeout(() => {
      button.classList.remove("wrong");
    }, 700);

  }
}


/* =========================================
   INTERCEPTED MESSAGES
========================================= */

function showMessages() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="file-tag">INTERCEPTED COMMUNICATION</div>

    <h2>📱 RECOVERED MESSAGES</h2>

    <p>
      The following communications were recovered
      from the case.
    </p>

    <div class="archive-file">

      <div class="label">
        MESSAGE 001
      </div>

      <p>
        <strong>AYAN:</strong><br>
        i lovee you ( mere bacheee)
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        MESSAGE 002
      </div>

      <p>
        <strong>MANYA:</strong><br>
        huhh main zyada achi hu
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        MESSAGE 003
      </div>

      <p>
        <strong>MANYA:</strong><br>
        missingggg youu
      </p>

    </div>


    <div class="divider"></div>

    <p>
      <strong>INVESTIGATOR'S NOTE:</strong><br>
      Further investigation suggests that
      both parties may be equally obsessed.
    </p>

  `;
}


/* =========================================
   MANYA'S ARCHIVE
========================================= */

function showArchive() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="file-tag">PERSONAL ARCHIVE</div>

    <h2>🗃️ MANYA'S ARCHIVE</h2>

    <p>
      Private observations collected by the investigator.
    </p>


    <div class="archive-file">

      <div class="label">
        FILE 001 — THE THINGS I NOTICE
      </div>

      <p>
        I notice when you're there for everyone.<br>
        I notice the little ways you care.<br>
        I notice more than you probably think I do.
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        FILE 002 — THE WAY YOU TAKE CARE OF ME
      </div>

      <p>
        I love when you take care of me.
        It's one of those little things that means
        much more to me than I know how to explain.
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        FILE 003 — UNFAIRLY CUTE
      </div>

      <p>
        You always look cute.<br>
        It's honestly getting ridiculous at this point. 😭
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        FILE 004 — THE PROTECTIVE ONE
      </div>

      <p>
        I remember how you actually protect me.
        And maybe I don't say it enough,
        but it makes me feel really cared for.
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        FILE 005 — THAT ONE THING
      </div>

      <p>
        One thing you do that makes me smile?<br><br>
        The way you hold me.
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        FILE 006 — THE SIMPLEST ANSWER
      </div>

      <p>
        What do I love about your personality?
        <br><br>
        ...you.
        <br><br>
        I love you.
      </p>

    </div>

  `;
}


/* =========================================
   CONFIDENTIAL FILES
========================================= */

function showConfidential() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="file-tag">CONFIDENTIAL</div>

    <h2>💌 CONFIDENTIAL FILES</h2>

    <p>
      Information the investigator doesn't
      usually say out loud.
    </p>


    <div class="archive-file">

      <div class="label">
        CONFIDENTIAL FILE 01
      </div>

      <h3>THINGS I DON'T SAY ENOUGH</h3>

      <p>
        I don't think I tell you this enough,
        but I notice everything.
      </p>

      <p>
        I notice the little things you do for me.
        The way you care, the way you make sure
        I'm okay, the way you can make me smile
        even when I'm not really in the mood to.
      </p>

      <p>
        Sometimes I might not say anything about it,
        but please know that I notice.
      </p>

      <p>
        I appreciate you more than I probably show.
      </p>

      <p>
        And honestly… I don't think I'll ever get
        tired of having you in my life.
      </p>

      <p>
        <strong>So if I don't say it enough:</strong>
      </p>

      <p>
        <strong>thank you for being you.</strong>
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        CONFIDENTIAL FILE 02
      </div>

      <h3>WHY YOU MATTER</h3>

      <p>
        You matter to me for so many reasons
        that I don't even know where to start.
      </p>

      <p>
        You matter because you're someone I can
        be completely myself with.
      </p>

      <p>
        Because I know I can come to you,
        annoy you, miss you, talk nonsense with you,
        and still feel like I belong.
      </p>

      <p>
        You matter because of the way you care.
        The little things you do, the way you look
        out for me, the way you make me feel
        protected and loved.
      </p>

      <p>
        And maybe the simplest reason is also
        the biggest one—
      </p>

      <p>
        <strong>you're you.</strong>
      </p>

      <p>
        And I love you for exactly that.
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        CONFIDENTIAL FILE 03
      </div>

      <h3>OPEN WHEN YOU MISS ME</h3>

      <p>
        If you're reading this because you miss me…
      </p>

      <p>
        then come here, bacheee. 🥹
      </p>

      <p>
        I wish I could just be there with you right now.
        No big conversation, no anything special —
        just us, spending time together.
      </p>

      <p>
        And if I'm not there, I hope you remember
        that somewhere, I'm probably missing you too.
      </p>

      <p>
        So don't overthink it.
        Don't wonder whether I care.
      </p>

      <p>
        <strong>I do.</strong>
      </p>

      <p>
        More than I probably manage to put into words.
      </p>

      <p>
        Think about all our little moments,
        all the stupid conversations,
        all the times you've irritated me,
        all the times you've made me smile
        without even trying.
      </p>

      <p>
        And remember this:
      </p>

      <p>
        <strong>
        distance, busy days, random arguments,
        or anything else can never change
        how much you mean to me.
        </strong>
      </p>

      <p>
        Now stop missing me so muchhh.
      </p>

      <p>
        I'm still your bachi. ❤️
      </p>

    </div>


    <div class="archive-file">

      <div class="label">
        CONFIDENTIAL FILE 04
      </div>

      <h3>ONE THING I NEED YOU TO KNOW</h3>

      <p>
        You don't have to be perfect for me.
      </p>

      <p>
        You don't have to always know what to say,
        always make everything okay,
        or always have everything figured out.
      </p>

      <p>
        I just want <strong>you.</strong>
      </p>

      <p>
        Your unfiltered self.
        Your annoying side.
        Your cute side.
        Your caring side.
        Even the version of you that thinks
        he's irritating me when he's actually
        making me smile. 😭
      </p>

      <p>
        I love the way you are with me,
        and I love that I can be myself with you too.
      </p>

      <p>
        So whenever you doubt how much you mean
        to me, I want you to remember this:
      </p>

      <p>
        <strong>
        you are loved, you are appreciated,
        and you are so, so important to me.
        </strong>
      </p>

      <p>
        And no matter how many times I forget to say it…
      </p>

      <p>
        <strong>
        I love you. More than I know how to explain.
        </strong>
      </p>

      <p>
        — your bachi ❤️
      </p>

    </div>

  `;
}


/* =========================================
   RESTRICTED AREA
========================================= */

function showRestricted() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="final-report">

      <div class="file-tag">
        MAXIMUM CLEARANCE
      </div>

      <h2>🔓 RESTRICTED FILE</h2>

      <div class="divider"></div>

      <p>
        AYAN, YOU WERE NOT SUPPOSED TO GET THIS FAR.
      </p>

      <p>
        But since you've completed the investigation…
      </p>

      <button
        class="action-button"
        onclick="openFinalConfession()">

        OPEN RESTRICTED FILE

      </button>

    </div>

  `;
}


/* =========================================
   FINAL CONFESSION
========================================= */

function openFinalConfession() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="final-report">

      <div class="file-tag">
        RESTRICTED // AYAN ONLY
      </div>

      <h2>FINAL CONFESSION</h2>

      <div class="divider"></div>

      <p>
        Okayy soo…
      </p>

      <p>
        Something I wanna tell you.
      </p>

      <p>
        I don't say this enough, but you really are
        the best.
      </p>

      <p>
        <strong>Jaan basti h meri tujhme.</strong>
      </p>

      <p>
        I love you not because you're perfect,
        but because you're always your completely
        unfiltered self with me.
      </p>

      <p>
        And somehow, that's one of the things
        I love most about you.
      </p>

      <p>
        Thank you.
      </p>

      <p>
        For every little thing you do for me.<br>
        For taking care of me.<br>
        For being there.<br>
        For making me laugh.<br>
        For irritating me for absolutely no reason. 😭<br>
        For making me feel protected.<br>
        For all the moments you probably don't
        even realise I'll remember.
      </p>

      <p>
        I don't know if I can ever properly explain
        how much you mean to me.
      </p>

      <div class="finding">
        YOU ARE ONE OF THE MOST PRECIOUS
        PARTS OF MY LIFE.
      </div>

      <p>
        And if there's one thing I want you to take
        from this entire case file, it's this:
      </p>

      <p>
        You are loved.<br>
        You are appreciated.<br>
        You are important to me.
      </p>

      <p>
        And if I had to investigate the entire universe
        for the reason why I love you…
      </p>

      <p>
        I think the case would still come back
        to the same answer.
      </p>

      <p>
        <strong>It's you.</strong>
      </p>

      <p>
        Always you.
      </p>

      <button
        class="action-button"
        onclick="showFinalReport()">

        CLOSE CASE →

      </button>

    </div>

  `;
}


/* =========================================
   FINAL REPORT
========================================= */

function showFinalReport() {

  const content = document.getElementById("content");

  content.innerHTML = `

    <div class="final-report">

      <div class="case-closed">
        CASE CLOSED
      </div>

      <p>
        SUBJECT: AYAN
      </p>

      <p>
        INVESTIGATOR: MANYA
      </p>

      <p>
        CASE NUMBER: AYAN-001
      </p>

      <p>
        INVESTIGATION: COMPLETE
      </p>

      <div class="finding">
        FINAL FINDING: IRREPLACEABLE
      </div>

      <div class="divider"></div>

      <p>
        No more evidence to collect.
      </p>

      <p>
        No more missions to complete.
      </p>

      <p>
        No more files to unlock.
      </p>

      <p>
        After reviewing all available evidence,
        one conclusion became impossible to ignore:
      </p>

      <p>
        <strong>
        You mean more to me than words can
        properly explain.
        </strong>
      </p>

      <p>
        I could write a hundred files about you.
        I could make a thousand little memories
        into evidence.
      </p>

      <p>
        And somehow, the answer would still be the same.
      </p>

      <div class="finding">
        I LOVE YOU.
      </div>

      <p>
        Thank you for being my person.
        Thank you for being you.
        Thank you for every little thing you do
        that makes my life a little happier.
      </p>

      <p>
        And if you ever wonder what the final
        evidence was…
      </p>

      <p>
        It was never really the messages,
        the memories, or the clues.
      </p>

      <p>
        <strong>It was you.</strong>
      </p>

      <p>
        So, Ayan—
      </p>

      <p>
        <strong>case closed. ❤️</strong>
      </p>

      <p>
        — your bachi, always.
      </p>

    </div>

  `;
}


/* =========================================
   PROGRESS SYSTEM
========================================= */

function updateProgress() {

  const evidenceProgress =
    (evidenceVerified / totalEvidence) * 50;

  const missionProgress =
    (missionsCompleted / totalMissions) * 50;

  const totalProgress =
    Math.round(evidenceProgress + missionProgress);

  document.getElementById("caseProgress")
    .style.width = totalProgress + "%";

  document.getElementById("progressPercent")
    .textContent = totalProgress + "%";


  /* Unlock confidential files */

  if (
    evidenceVerified >= 3 &&
    missionsCompleted >= 1 &&
    !confidentialUnlocked
  ) {

    confidentialUnlocked = true;

    const card =
      document.getElementById("confidentialCard");

    card.classList.remove("locked");
    card.classList.add("unlocked");

    card.querySelector("small").textContent =
      "✓ CLEARANCE GRANTED";
  }


  /* Unlock restricted area */

  if (
    evidenceVerified === totalEvidence &&
    missionsCompleted === totalMissions &&
    !restrictedUnlocked
  ) {

    restrictedUnlocked = true;

    const card =
      document.getElementById("restrictedCard");

    card.classList.remove("locked");
    card.classList.add("unlocked");

    card.querySelector("small").textContent =
      "✓ MAXIMUM CLEARANCE";
  }

}
