const arr = [
  {
    id: 538,
    name: 'comprehension_orale_test_10_serie_162',
    unitType: 'listen',
  },
  {
    id: 539,
    name: 'comprehension_orale_test_11_serie_171',
    unitType: 'listen',
  },
  {
    id: 540,
    name: 'comprehension_orale_test_12_serie_172',
    unitType: 'listen',
  },
  {
    id: 541,
    name: 'comprehension_orale_test_13_serie_176',
    unitType: 'listen',
  },
  {
    id: 542,
    name: 'comprehension_orale_test_14_serie_163',
    unitType: 'listen',
  },
  {
    id: 543,
    name: 'comprehension_orale_test_15_serie_178',
    unitType: 'listen',
  },
  {
    id: 544,
    name: 'comprehension_orale_test_16_serie_179',
    unitType: 'listen',
  },
  {
    id: 545,
    name: 'comprehension_orale_test_17_serie_175',
    unitType: 'listen',
  },
  {
    id: 546,
    name: 'comprehension_orale_test_18_serie_154',
    unitType: 'listen',
  },
  {
    id: 547,
    name: 'comprehension_orale_test_19_serie_167',
    unitType: 'listen',
  },
  {
    id: 548,
    name: 'comprehension_orale_test_1_serie_148',
    unitType: 'listen',
  },
  {
    id: 549,
    name: 'comprehension_orale_test_20_serie_180',
    unitType: 'listen',
  },
  {
    id: 550,
    name: 'comprehension_orale_test_21_serie_165',
    unitType: 'listen',
  },
  {
    id: 551,
    name: 'comprehension_orale_test_22_serie_158',
    unitType: 'listen',
  },
  {
    id: 552,
    name: 'comprehension_orale_test_23_serie_183',
    unitType: 'listen',
  },
  {
    id: 553,
    name: 'comprehension_orale_test_24_serie_166',
    unitType: 'listen',
  },
  {
    id: 554,
    name: 'comprehension_orale_test_25_serie_159',
    unitType: 'listen',
  },
  {
    id: 555,
    name: 'comprehension_orale_test_26_serie_181',
    unitType: 'listen',
  },
  {
    id: 556,
    name: 'comprehension_orale_test_27_serie_186',
    unitType: 'listen',
  },
  {
    id: 557,
    name: 'comprehension_orale_test_28_serie_185',
    unitType: 'listen',
  },
  {
    id: 558,
    name: 'comprehension_orale_test_29_serie_177',
    unitType: 'listen',
  },
  {
    id: 559,
    name: 'comprehension_orale_test_2_serie_149',
    unitType: 'listen',
  },
  {
    id: 560,
    name: 'comprehension_orale_test_30_serie_169',
    unitType: 'listen',
  },
  {
    id: 561,
    name: 'comprehension_orale_test_31_serie188',
    unitType: 'listen',
  },
  {
    id: 562,
    name: 'comprehension_orale_test_32_serie_153',
    unitType: 'listen',
  },
  {
    id: 563,
    name: 'comprehension_orale_test_33_serie_164',
    unitType: 'listen',
  },
  {
    id: 564,
    name: 'comprehension_orale_test_34_serie_170',
    unitType: 'listen',
  },
  {
    id: 565,
    name: 'comprehension_orale_test_35_serie_160',
    unitType: 'listen',
  },
  {
    id: 566,
    name: 'comprehension_orale_test_36_serie_168',
    unitType: 'listen',
  },
  {
    id: 567,
    name: 'comprehension_orale_test_38_serie_187',
    unitType: 'listen',
  },
  {
    id: 568,
    name: 'comprehension_orale_test_39_serie_184',
    unitType: 'listen',
  },
  {
    id: 569,
    name: 'comprehension_orale_test_3_serie_151',
    unitType: 'listen',
  },
  {
    id: 570,
    name: 'comprehension_orale_test_40',
    unitType: 'listen',
  },
  {
    id: 571,
    name: 'comprehension_orale_test_4_serie_152',
    unitType: 'listen',
  },
  {
    id: 572,
    name: 'comprehension_orale_test_5_serie_155',
    unitType: 'listen',
  },
  {
    id: 573,
    name: 'comprehension_orale_test_6_serie_150',
    unitType: 'listen',
  },
  {
    id: 574,
    name: 'comprehension_orale_test_7_serie_156',
    unitType: 'listen',
  },
  {
    id: 575,
    name: 'comprehension_orale_test_8_serie_157',
    unitType: 'listen',
  },
  {
    id: 576,
    name: 'comprehension_orale_test_9_serie_161',
    unitType: 'listen',
  },
];
arr.sort((a, b) => {
  const arr1 = a.name.split('_');
  const arr2 = b.name.split('_');
  return parseFloat(arr1[3]) - parseFloat(arr2[3]);
});
console.log('arr', arr);
