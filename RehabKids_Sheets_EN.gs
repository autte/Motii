// RehabKids — Google Sheets Template Generator (English)
// Instructions:
// 1. Go to https://script.google.com
// 2. Click "New project"
// 3. Paste this entire script (replace the default content)
// 4. Click Run → select createRehabKidsTemplate
// 5. Authorize when prompted — your new spreadsheet link will appear in a popup

function createRehabKidsTemplate() {
  const ss = SpreadsheetApp.create('RehabKids — Emma Recovery Journal');
  const url = ss.getUrl();

  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];

  // ══════════════════════════════════════════════════════════════
  // 1. activity_logs — filled by parent after each session
  // ══════════════════════════════════════════════════════════════
  const log = ss.insertSheet('📋 activity_logs');
  const logHeaders = [
    'date','child_name','activity','emoji',
    'duration_min','mood',
    'obs_tag_1','obs_tag_2','obs_tag_3',
    'note','has_video','video_filename'
  ];
  const logSample = [
    ['2025-06-15','Emma','Kicking ball','⚽',30,'Great','Right foot strong','Enjoyed activity','','','FALSE',''],
    ['2025-06-14','Emma','PRC eye training','👁',5,'Great','Eyes focused','','','Day 14 streak','FALSE',''],
    ['2025-06-13','Emma','Single-leg stand','🦶',10,'Okay','Needed encouragement','','','','TRUE','2025-06-13-stand.mp4'],
    ['2025-06-12','Emma','Drone assembly','✈️',35,'Great','Right hand engaged','Enjoyed activity','','First time grabbing screwdriver','FALSE',''],
    ['2025-06-11','Emma','Swimming','🏊',45,'Great','Good balance','Enjoyed activity','','','FALSE',''],
  ];
  setupSheet(log, logHeaders, logSample, '#D9EAD3');

  // ══════════════════════════════════════════════════════════════
  // 2. monthly_assessments — one row per month, end of month
  // ══════════════════════════════════════════════════════════════
  const mo = ss.insertSheet('📊 monthly_assessments');
  const moHeaders = [
    'month','child_name',
    'stand_sec','jump_count','prc_cm','strabismus_star','hear_pct',
    'right_hand_pct','total_activities','note'
  ];
  const moSample = [
    ['2025-06','Emma',2,0,10,2,88,'','','Hearing near target, right hand improving'],
    ['2025-05','Emma',2,0,10,2,85,'','','PRC training full attendance'],
    ['2025-04','Emma',2,0,11,1,78,'','',''],
    ['2025-03','Emma',2,0,12,1,74,'','',''],
    ['2025-02','Emma',2,0,12,1,72,'','',''],
    ['2025-01','Emma',2,0,13,1,70,'','','First recording month'],
  ];
  setupSheet(mo, moHeaders, moSample, '#CFE2F3');

  // Auto-formulas for right_hand_pct (col H) and total_activities (col I)
  for (let r = 2; r <= 20; r++) {
    mo.getRange(`H${r}`).setFormula(
      `=IFERROR(COUNTIFS('📋 activity_logs'!B:B,B${r},'📋 activity_logs'!G:G,"Right hand engaged")/COUNTIFS('📋 activity_logs'!B:B,B${r}),"")`
    );
    mo.getRange(`I${r}`).setFormula(
      `=IFERROR(COUNTIF('📋 activity_logs'!B:B,B${r}),"")`
    );
  }
  mo.getRange('H1').setValue('right_hand_pct');
  mo.getRange('I1').setValue('total_activities');
  mo.getRange('H1:I1').setBackground('#CFE2F3').setFontWeight('bold');

  // ══════════════════════════════════════════════════════════════
  // 3. goals — staged recovery targets
  // ══════════════════════════════════════════════════════════════
  const goals = ss.insertSheet('🎯 goals');
  const goalHeaders = [
    'goal_id','child_name','name','category',
    'current_value','target_value','unit',
    'higher_is_better','phase','note','created_date'
  ];
  const goalSample = [
    ['goal_001','Emma','Right-leg single stand','leg',2,8,'sec','TRUE','Phase 2','No improvement in 2 years — priority','2025-01-01'],
    ['goal_002','Emma','Left ear recognition rate','hearing',88,90,'%','TRUE','Phase 1','Close to target — adjust hearing aid','2025-01-01'],
    ['goal_003','Emma','Strabismus frequency','eye',2,4,'★','TRUE','Phase 1','Higher = better (less frequent)','2025-01-01'],
    ['goal_004','Emma','PRC convergence distance','eye',10,5,'cm','FALSE','Phase 1','Lower = better','2025-01-01'],
    ['goal_005','Emma','Right hand engagement rate','hand',25,50,'%','TRUE','Phase 3','Auto-calculated from obs tags','2025-03-01'],
    ['goal_006','Emma','Right-foot single hop','leg',0,3,'hops','TRUE','Phase 2','New goal — build from kicking','2025-03-01'],
  ];
  setupSheet(goals, goalHeaders, goalSample, '#FFF2CC');

  // ══════════════════════════════════════════════════════════════
  // 4. activities — activity library (parent customizable)
  // ══════════════════════════════════════════════════════════════
  const acts = ss.insertSheet('⚽ activities');
  const actHeaders = [
    'activity_id','name','emoji','category',
    'frequency','duration_min','linked_goal_id','observation_note'
  ];
  const actSample = [
    ['act_001','Kicking ball','⚽','sport','2–3x per week',30,'goal_006','Watch right foot push-off'],
    ['act_002','Swimming','🏊','sport','Once a week',45,'','Replace high-intensity on fatigue days'],
    ['act_003','Drone assembly','✈️','daily','2–4x per week',35,'goal_005','Watch right hand gripping screwdriver'],
    ['act_004','Video games','🎮','game','As desired',20,'goal_005','Choose games requiring both hands'],
    ['act_005','PRC eye training','👁','therapy','Daily',5,'goal_004','Must not skip — 5 min every day'],
    ['act_006','Single-leg stand practice','🦶','therapy','Daily',10,'goal_001','3 sets × 10 sec, 30 sec rest'],
    ['act_007','Walking','🚶','sport','As desired',20,'',''],
  ];
  setupSheet(acts, actHeaders, actSample, '#EAD1DC');

  // ══════════════════════════════════════════════════════════════
  // 5. video_records — video files + AI assessment results
  // ══════════════════════════════════════════════════════════════
  const vids = ss.insertSheet('🎥 video_records');
  const vidHeaders = [
    'video_id','date','child_name','activity',
    'filename','gdrive_link',
    'ai_overall_score','ai_best_stand_sec','ai_stability_score',
    'ai_posture_score','ai_hand_score',
    'ai_key_tip','ai_analyzed_at'
  ];
  const vidSample = [
    ['vid_001','2025-06-13','Emma','Single-leg stand practice',
     '2025-06-13-stand.mp4','https://drive.google.com/...',
     72,2.8,68,74,90,
     'Right knee inward — try placing ball outside knee','2025-06-13'],
  ];
  setupSheet(vids, vidHeaders, vidSample, '#F4CCCC');

  // Delete default blank sheet
  try { ss.deleteSheet(defaultSheet); } catch(e) {}

  // Done
  Logger.log('✅ Template created successfully!');
  Logger.log('🔗 URL: ' + url);

  SpreadsheetApp.getUi().alert(
    '✅ RehabKids template created!\n\n' +
    '🔗 ' + url + '\n\n' +
    '5 sheets created:\n' +
    '• 📋 activity_logs\n' +
    '• 📊 monthly_assessments (auto-formulas included)\n' +
    '• 🎯 goals\n' +
    '• ⚽ activities\n' +
    '• 🎥 video_records'
  );
}

// ── Helper: write headers + data + formatting ─────────────────
function setupSheet(sheet, headers, sampleRows, headerColor) {
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground(headerColor);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);

  if (sampleRows.length > 0) {
    sheet.getRange(2, 1, sampleRows.length, headers.length)
      .setValues(sampleRows);
  }

  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
    if (sheet.getColumnWidth(i) < 80) sheet.setColumnWidth(i, 80);
  }

  sheet.setFrozenRows(1);

  const dataRows = sheet.getMaxRows() - 1;
  if (dataRows > 0) {
    try {
      sheet.getRange(2, 1, dataRows, headers.length)
        .applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
    } catch(e) {}
  }

  sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).setFontSize(11);
}
