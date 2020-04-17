import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";
import '../shared/internal.css';

const TITLE = 'PAFB Survey Sheet'

const inputNamesArr_nestsStart = 0;
const inputNamesArr_falseCrawlsStart = 144;
const inputNamesArr = [
  "km_25_45s_0_b_cc_nests", // 0
  "km_25_45s_0_t_cc_nests",
  "km_25_45s_0_o_cc_nests",
  "km_25_45s_0_b_cm_nests",
  "km_25_45s_0_t_cm_nests",
  "km_25_45s_0_o_cm_nests",
  "km_3_4s_05_b_cc_nests",
  "km_3_4s_05_t_cc_nests",
  "km_3_4s_05_o_cc_nests",
  "km_3_4s_05_b_cm_nests",
  "km_3_4s_05_t_cm_nests",
  "km_3_4s_05_o_cm_nests",
  "km_35_35s_1_b_cc_nests",
  "km_35_35s_1_t_cc_nests",
  "km_35_35s_1_o_cc_nests",
  "km_35_35s_1_b_cm_nests",
  "km_35_35s_1_t_cm_nests",
  "km_35_35s_1_o_cm_nests",
  "km_4_3s_15_b_cc_nests",
  "km_4_3s_15_t_cc_nests",
  "km_4_3s_15_o_cc_nests",
  "km_4_3s_15_b_cm_nests",
  "km_4_3s_15_t_cm_nests",
  "km_4_3s_15_o_cm_nests",
  "km_45_25s_2_b_cc_nests",
  "km_45_25s_2_t_cc_nests",
  "km_45_25s_2_o_cc_nests",
  "km_45_25s_2_b_cm_nests",
  "km_45_25s_2_t_cm_nests",
  "km_45_25s_2_o_cm_nests",
  "km_5_2s_25_b_cc_nests",
  "km_5_2s_25_t_cc_nests",
  "km_5_2s_25_o_cc_nests",
  "km_5_2s_25_b_cm_nests",
  "km_5_2s_25_t_cm_nests",
  "km_5_2s_25_o_cm_nests",
  "km_55_15s_3_b_cc_nests",
  "km_55_15s_3_t_cc_nests",
  "km_55_15s_3_o_cc_nests",
  "km_55_15s_3_b_cm_nests",
  "km_55_15s_3_t_cm_nests",
  "km_55_15s_3_o_cm_nests",
  "km_6_1s_35_b_cc_nests",
  "km_6_1s_35_t_cc_nests",
  "km_6_1s_35_o_cc_nests",
  "km_6_1s_35_b_cm_nests",
  "km_6_1s_35_t_cm_nests",
  "km_6_1s_35_o_cm_nests",
  "km_65_05s_4_b_cc_nests",
  "km_65_05s_4_t_cc_nests",
  "km_65_05s_4_o_cc_nests",
  "km_65_05s_4_b_cm_nests",
  "km_65_05s_4_t_cm_nests",
  "km_65_05s_4_o_cm_nests",
  "km_7_0s_45_b_cc_nests",
  "km_7_0s_45_t_cc_nests",
  "km_7_0s_45_o_cc_nests",
  "km_7_0s_45_b_cm_nests",
  "km_7_0s_45_t_cm_nests",
  "km_7_0s_45_o_cm_nests",
  "km_75_0n_5_b_cc_nests",
  "km_75_0n_5_t_cc_nests",
  "km_75_0n_5_o_cc_nests",
  "km_75_0n_5_b_cm_nests",
  "km_75_0n_5_t_cm_nests",
  "km_75_0n_5_o_cm_nests",
  "km_8_05n_55_b_cc_nests",
  "km_8_05n_55_t_cc_nests",
  "km_8_05n_55_o_cc_nests",
  "km_8_05n_55_b_cm_nests",
  "km_8_05n_55_t_cm_nests",
  "km_8_05n_55_o_cm_nests",
  "km_85_1n_6_b_cc_nests",
  "km_85_1n_6_t_cc_nests",
  "km_85_1n_6_o_cc_nests",
  "km_85_1n_6_b_cm_nests",
  "km_85_1n_6_t_cm_nests",
  "km_85_1n_6_o_cm_nests",
  "km_9_15n_65_b_cc_nests",
  "km_9_15n_65_t_cc_nests",
  "km_9_15n_65_o_cc_nests",
  "km_9_15n_65_b_cm_nests",
  "km_9_15n_65_t_cm_nests",
  "km_9_15n_65_o_cm_nests",
  "km_95_2n_b_cc_nests",
  "km_95_2n_t_cc_nests",
  "km_95_2n_o_cc_nests",
  "km_95_2n_b_cm_nests",
  "km_95_2n_t_cm_nests",
  "km_95_2n_o_cm_nests",
  "km_10_b_cc_nests",
  "km_10_t_cc_nests",
  "km_10_o_cc_nests",
  "km_10_b_cm_nests",
  "km_10_t_cm_nests",
  "km_10_o_cm_nests",
  "km_105_b_cc_nests",
  "km_105_t_cc_nests",
  "km_105_o_cc_nests",
  "km_105_b_cm_nests",
  "km_105_t_cm_nests",
  "km_105_o_cm_nests",
  "km_11_b_cc_nests",
  "km_11_t_cc_nests",
  "km_11_o_cc_nests",
  "km_11_b_cm_nests",
  "km_11_t_cm_nests",
  "km_11_o_cm_nests",
  "km_115_b_cc_nests",
  "km_115_t_cc_nests",
  "km_115_o_cc_nests",
  "km_115_b_cm_nests",
  "km_115_t_cm_nests",
  "km_115_o_cm_nests",
  "km_12_b_cc_nests",
  "km_12_t_cc_nests",
  "km_12_o_cc_nests",
  "km_12_b_cm_nests",
  "km_12_t_cm_nests",
  "km_12_o_cm_nests",
  "km_125_b_cc_nests",
  "km_125_t_cc_nests",
  "km_125_o_cc_nests",
  "km_125_b_cm_nests",
  "km_125_t_cm_nests",
  "km_125_o_cm_nests",
  "km_13_b_cc_nests",
  "km_13_t_cc_nests",
  "km_13_o_cc_nests",
  "km_13_b_cm_nests",
  "km_13_t_cm_nests",
  "km_13_o_cm_nests",
  "km_135_b_cc_nests",
  "km_135_t_cc_nests",
  "km_135_o_cc_nests",
  "km_135_b_cm_nests",
  "km_135_t_cm_nests",
  "km_135_o_cm_nests",
  "km_14_b_cc_nests",
  "km_14_t_cc_nests",
  "km_14_o_cc_nests",
  "km_14_b_cm_nests",
  "km_14_t_cm_nests",
  "km_14_o_cm_nests",
  "km_25_45s_0_before_l_cc_fc", //144
  "km_25_45s_0_before_p_cc_fc",
  "km_25_45s_0_before_a_cc_fc",
  "km_25_45s_0_tran_l_cc_fc",
  "km_25_45s_0_tran_p_cc_fc",
  "km_25_45s_0_tran_a_cc_fc",
  "km_25_45s_0_on_l_cc_fc",
  "km_25_45s_0_on_p_cc_fc",
  "km_25_45s_0_on_a_cc_fc",
  "km_25_45s_0_before_l_cm_fc",
  "km_25_45s_0_before_p_cm_fc",
  "km_25_45s_0_before_a_cm_fc",
  "km_25_45s_0_tran_l_cm_fc",
  "km_25_45s_0_tran_p_cm_fc",
  "km_25_45s_0_tran_a_cm_fc",
  "km_25_45s_0_on_l_cm_fc",
  "km_25_45s_0_on_p_cm_fc",
  "km_25_45s_0_on_a_cm_fc",
  "km_3_4s_05_before_l_cc_fc",
  "km_3_4s_05_before_p_cc_fc",
  "km_3_4s_05_before_a_cc_fc",
  "km_3_4s_05_tran_l_cc_fc",
  "km_3_4s_05_tran_p_cc_fc",
  "km_3_4s_05_tran_a_cc_fc",
  "km_3_4s_05_on_l_cc_fc",
  "km_3_4s_05_on_p_cc_fc",
  "km_3_4s_05_on_a_cc_fc",
  "km_3_4s_05_before_l_cm_fc",
  "km_3_4s_05_before_p_cm_fc",
  "km_3_4s_05_before_a_cm_fc",
  "km_3_4s_05_tran_l_cm_fc",
  "km_3_4s_05_tran_p_cm_fc",
  "km_3_4s_05_tran_a_cm_fc",
  "km_3_4s_05_on_l_cm_fc",
  "km_3_4s_05_on_p_cm_fc",
  "km_3_4s_05_on_a_cm_fc",
  "km_35_35s_1_before_l_cc_fc",
  "km_35_35s_1_before_p_cc_fc",
  "km_35_35s_1_before_a_cc_fc",
  "km_35_35s_1_tran_l_cc_fc",
  "km_35_35s_1_tran_p_cc_fc",
  "km_35_35s_1_tran_a_cc_fc",
  "km_35_35s_1_on_l_cc_fc",
  "km_35_35s_1_on_p_cc_fc",
  "km_35_35s_1_on_a_cc_fc",
  "km_35_35s_1_before_l_cm_fc",
  "km_35_35s_1_before_p_cm_fc",
  "km_35_35s_1_before_a_cm_fc",
  "km_35_35s_1_tran_l_cm_fc",
  "km_35_35s_1_tran_p_cm_fc",
  "km_35_35s_1_tran_a_cm_fc",
  "km_35_35s_1_on_l_cm_fc",
  "km_35_35s_1_on_p_cm_fc",
  "km_35_35s_1_on_a_cm_fc",
  "km_4_3s_15_before_l_cc_fc",
  "km_4_3s_15_before_p_cc_fc",
  "km_4_3s_15_before_a_cc_fc",
  "km_4_3s_15_tran_l_cc_fc",
  "km_4_3s_15_tran_p_cc_fc",
  "km_4_3s_15_tran_a_cc_fc",
  "km_4_3s_15_on_l_cc_fc",
  "km_4_3s_15_on_p_cc_fc",
  "km_4_3s_15_on_a_cc_fc",
  "km_4_3s_15_before_l_cm_fc",
  "km_4_3s_15_before_p_cm_fc",
  "km_4_3s_15_before_a_cm_fc",
  "km_4_3s_15_tran_l_cm_fc",
  "km_4_3s_15_tran_p_cm_fc",
  "km_4_3s_15_tran_a_cm_fc",
  "km_4_3s_15_on_l_cm_fc",
  "km_4_3s_15_on_p_cm_fc",
  "km_4_3s_15_on_a_cm_fc",
  "km_45_25s_2_before_l_cc_fc",
  "km_45_25s_2_before_p_cc_fc",
  "km_45_25s_2_before_a_cc_fc",
  "km_45_25s_2_tran_l_cc_fc",
  "km_45_25s_2_tran_p_cc_fc",
  "km_45_25s_2_tran_a_cc_fc",
  "km_45_25s_2_on_l_cc_fc",
  "km_45_25s_2_on_p_cc_fc",
  "km_45_25s_2_on_a_cc_fc",
  "km_45_25s_2_before_l_cm_fc",
  "km_45_25s_2_before_p_cm_fc",
  "km_45_25s_2_before_a_cm_fc",
  "km_45_25s_2_tran_l_cm_fc",
  "km_45_25s_2_tran_p_cm_fc",
  "km_45_25s_2_tran_a_cm_fc",
  "km_45_25s_2_on_l_cm_fc",
  "km_45_25s_2_on_p_cm_fc",
  "km_45_25s_2_on_a_cm_fc",
  "km_5_2s_25_before_l_cc_fc",
  "km_5_2s_25_before_p_cc_fc",
  "km_5_2s_25_before_a_cc_fc",
  "km_5_2s_25_tran_l_cc_fc",
  "km_5_2s_25_tran_p_cc_fc",
  "km_5_2s_25_tran_a_cc_fc",
  "km_5_2s_25_on_l_cc_fc",
  "km_5_2s_25_on_p_cc_fc",
  "km_5_2s_25_on_a_cc_fc",
  "km_5_2s_25_before_l_cm_fc",
  "km_5_2s_25_before_p_cm_fc",
  "km_5_2s_25_before_a_cm_fc",
  "km_5_2s_25_tran_l_cm_fc",
  "km_5_2s_25_tran_p_cm_fc",
  "km_5_2s_25_tran_a_cm_fc",
  "km_5_2s_25_on_l_cm_fc",
  "km_5_2s_25_on_p_cm_fc",
  "km_5_2s_25_on_a_cm_fc",
  "km_55_15s_3_before_l_cc_fc",
  "km_55_15s_3_before_p_cc_fc",
  "km_55_15s_3_before_a_cc_fc",
  "km_55_15s_3_tran_l_cc_fc",
  "km_55_15s_3_tran_p_cc_fc",
  "km_55_15s_3_tran_a_cc_fc",
  "km_55_15s_3_on_l_cc_fc",
  "km_55_15s_3_on_p_cc_fc",
  "km_55_15s_3_on_a_cc_fc",
  "km_55_15s_3_before_l_cm_fc",
  "km_55_15s_3_before_p_cm_fc",
  "km_55_15s_3_before_a_cm_fc",
  "km_55_15s_3_tran_l_cm_fc",
  "km_55_15s_3_tran_p_cm_fc",
  "km_55_15s_3_tran_a_cm_fc",
  "km_55_15s_3_on_l_cm_fc",
  "km_55_15s_3_on_p_cm_fc",
  "km_55_15s_3_on_a_cm_fc",
  "km_6_1s_35_before_l_cc_fc",
  "km_6_1s_35_before_p_cc_fc",
  "km_6_1s_35_before_a_cc_fc",
  "km_6_1s_35_tran_l_cc_fc",
  "km_6_1s_35_tran_p_cc_fc",
  "km_6_1s_35_tran_a_cc_fc",
  "km_6_1s_35_on_l_cc_fc",
  "km_6_1s_35_on_p_cc_fc",
  "km_6_1s_35_on_a_cc_fc",
  "km_6_1s_35_before_l_cm_fc",
  "km_6_1s_35_before_p_cm_fc",
  "km_6_1s_35_before_a_cm_fc",
  "km_6_1s_35_tran_l_cm_fc",
  "km_6_1s_35_tran_p_cm_fc",
  "km_6_1s_35_tran_a_cm_fc",
  "km_6_1s_35_on_l_cm_fc",
  "km_6_1s_35_on_p_cm_fc",
  "km_6_1s_35_on_a_cm_fc",
  "km_65_05s_4_before_l_cc_fc",
  "km_65_05s_4_before_p_cc_fc",
  "km_65_05s_4_before_a_cc_fc",
  "km_65_05s_4_tran_l_cc_fc",
  "km_65_05s_4_tran_p_cc_fc",
  "km_65_05s_4_tran_a_cc_fc",
  "km_65_05s_4_on_l_cc_fc",
  "km_65_05s_4_on_p_cc_fc",
  "km_65_05s_4_on_a_cc_fc",
  "km_65_05s_4_before_l_cm_fc",
  "km_65_05s_4_before_p_cm_fc",
  "km_65_05s_4_before_a_cm_fc",
  "km_65_05s_4_tran_l_cm_fc",
  "km_65_05s_4_tran_p_cm_fc",
  "km_65_05s_4_tran_a_cm_fc",
  "km_65_05s_4_on_l_cm_fc",
  "km_65_05s_4_on_p_cm_fc",
  "km_65_05s_4_on_a_cm_fc",
  "km_7_0s_45_before_l_cc_fc",
  "km_7_0s_45_before_p_cc_fc",
  "km_7_0s_45_before_a_cc_fc",
  "km_7_0s_45_tran_l_cc_fc",
  "km_7_0s_45_tran_p_cc_fc",
  "km_7_0s_45_tran_a_cc_fc",
  "km_7_0s_45_on_l_cc_fc",
  "km_7_0s_45_on_p_cc_fc",
  "km_7_0s_45_on_a_cc_fc",
  "km_7_0s_45_before_l_cm_fc",
  "km_7_0s_45_before_p_cm_fc",
  "km_7_0s_45_before_a_cm_fc",
  "km_7_0s_45_tran_l_cm_fc",
  "km_7_0s_45_tran_p_cm_fc",
  "km_7_0s_45_tran_a_cm_fc",
  "km_7_0s_45_on_l_cm_fc",
  "km_7_0s_45_on_p_cm_fc",
  "km_7_0s_45_on_a_cm_fc",
  "km_75_0n_5_before_l_cc_fc",
  "km_75_0n_5_before_p_cc_fc",
  "km_75_0n_5_before_a_cc_fc",
  "km_75_0n_5_tran_l_cc_fc",
  "km_75_0n_5_tran_p_cc_fc",
  "km_75_0n_5_tran_a_cc_fc",
  "km_75_0n_5_on_l_cc_fc",
  "km_75_0n_5_on_p_cc_fc",
  "km_75_0n_5_on_a_cc_fc",
  "km_75_0n_5_before_l_cm_fc",
  "km_75_0n_5_before_p_cm_fc",
  "km_75_0n_5_before_a_cm_fc",
  "km_75_0n_5_tran_l_cm_fc",
  "km_75_0n_5_tran_p_cm_fc",
  "km_75_0n_5_tran_a_cm_fc",
  "km_75_0n_5_on_l_cm_fc",
  "km_75_0n_5_on_p_cm_fc",
  "km_75_0n_5_on_a_cm_fc",
  "km_8_05n_55_before_l_cc_fc",
  "km_8_05n_55_before_p_cc_fc",
  "km_8_05n_55_before_a_cc_fc",
  "km_8_05n_55_tran_l_cc_fc",
  "km_8_05n_55_tran_p_cc_fc",
  "km_8_05n_55_tran_a_cc_fc",
  "km_8_05n_55_on_l_cc_fc",
  "km_8_05n_55_on_p_cc_fc",
  "km_8_05n_55_on_a_cc_fc",
  "km_8_05n_55_before_l_cm_fc",
  "km_8_05n_55_before_p_cm_fc",
  "km_8_05n_55_before_a_cm_fc",
  "km_8_05n_55_tran_l_cm_fc",
  "km_8_05n_55_tran_p_cm_fc",
  "km_8_05n_55_tran_a_cm_fc",
  "km_8_05n_55_on_l_cm_fc",
  "km_8_05n_55_on_p_cm_fc",
  "km_8_05n_55_on_a_cm_fc",
  "km_85_1n_6_before_l_cc_fc",
  "km_85_1n_6_before_p_cc_fc",
  "km_85_1n_6_before_a_cc_fc",
  "km_85_1n_6_tran_l_cc_fc",
  "km_85_1n_6_tran_p_cc_fc",
  "km_85_1n_6_tran_a_cc_fc",
  "km_85_1n_6_on_l_cc_fc",
  "km_85_1n_6_on_p_cc_fc",
  "km_85_1n_6_on_a_cc_fc",
  "km_85_1n_6_before_l_cm_fc",
  "km_85_1n_6_before_p_cm_fc",
  "km_85_1n_6_before_a_cm_fc",
  "km_85_1n_6_tran_l_cm_fc",
  "km_85_1n_6_tran_p_cm_fc",
  "km_85_1n_6_tran_a_cm_fc",
  "km_85_1n_6_on_l_cm_fc",
  "km_85_1n_6_on_p_cm_fc",
  "km_85_1n_6_on_a_cm_fc",
  "km_9_15n_65_before_l_cc_fc",
  "km_9_15n_65_before_p_cc_fc",
  "km_9_15n_65_before_a_cc_fc",
  "km_9_15n_65_tran_l_cc_fc",
  "km_9_15n_65_tran_p_cc_fc",
  "km_9_15n_65_tran_a_cc_fc",
  "km_9_15n_65_on_l_cc_fc",
  "km_9_15n_65_on_p_cc_fc",
  "km_9_15n_65_on_a_cc_fc",
  "km_9_15n_65_before_l_cm_fc",
  "km_9_15n_65_before_p_cm_fc",
  "km_9_15n_65_before_a_cm_fc",
  "km_9_15n_65_tran_l_cm_fc",
  "km_9_15n_65_tran_p_cm_fc",
  "km_9_15n_65_tran_a_cm_fc",
  "km_9_15n_65_on_l_cm_fc",
  "km_9_15n_65_on_p_cm_fc",
  "km_9_15n_65_on_a_cm_fc",
  "km_95_2n_before_l_cc_fc",
  "km_95_2n_before_p_cc_fc",
  "km_95_2n_before_a_cc_fc",
  "km_95_2n_tran_l_cc_fc",
  "km_95_2n_tran_p_cc_fc",
  "km_95_2n_tran_a_cc_fc",
  "km_95_2n_on_l_cc_fc",
  "km_95_2n_on_p_cc_fc",
  "km_95_2n_on_a_cc_fc",
  "km_95_2n_before_l_cm_fc",
  "km_95_2n_before_p_cm_fc",
  "km_95_2n_before_a_cm_fc",
  "km_95_2n_tran_l_cm_fc",
  "km_95_2n_tran_p_cm_fc",
  "km_95_2n_tran_a_cm_fc",
  "km_95_2n_on_l_cm_fc",
  "km_95_2n_on_p_cm_fc",
  "km_95_2n_on_a_cm_fc",
  "km_10_before_l_cc_fc",
  "km_10_before_p_cc_fc",
  "km_10_before_a_cc_fc",
  "km_10_tran_l_cc_fc",
  "km_10_tran_p_cc_fc",
  "km_10_tran_a_cc_fc",
  "km_10_on_l_cc_fc",
  "km_10_on_p_cc_fc",
  "km_10_on_a_cc_fc",
  "km_10_before_l_cm_fc",
  "km_10_before_p_cm_fc",
  "km_10_before_a_cm_fc",
  "km_10_tran_l_cm_fc",
  "km_10_tran_p_cm_fc",
  "km_10_tran_a_cm_fc",
  "km_10_on_l_cm_fc",
  "km_10_on_p_cm_fc",
  "km_10_on_a_cm_fc",
  "km_105_before_l_cc_fc",
  "km_105_before_p_cc_fc",
  "km_105_before_a_cc_fc",
  "km_105_tran_l_cc_fc",
  "km_105_tran_p_cc_fc",
  "km_105_tran_a_cc_fc",
  "km_105_on_l_cc_fc",
  "km_105_on_p_cc_fc",
  "km_105_on_a_cc_fc",
  "km_105_before_l_cm_fc",
  "km_105_before_p_cm_fc",
  "km_105_before_a_cm_fc",
  "km_105_tran_l_cm_fc",
  "km_105_tran_p_cm_fc",
  "km_105_tran_a_cm_fc",
  "km_105_on_l_cm_fc",
  "km_105_on_p_cm_fc",
  "km_105_on_a_cm_fc",
  "km_11_before_l_cc_fc",
  "km_11_before_p_cc_fc",
  "km_11_before_a_cc_fc",
  "km_11_tran_l_cc_fc",
  "km_11_tran_p_cc_fc",
  "km_11_tran_a_cc_fc",
  "km_11_on_l_cc_fc",
  "km_11_on_p_cc_fc",
  "km_11_on_a_cc_fc",
  "km_11_before_l_cm_fc",
  "km_11_before_p_cm_fc",
  "km_11_before_a_cm_fc",
  "km_11_tran_l_cm_fc",
  "km_11_tran_p_cm_fc",
  "km_11_tran_a_cm_fc",
  "km_11_on_l_cm_fc",
  "km_11_on_p_cm_fc",
  "km_11_on_a_cm_fc",
  "km_115_before_l_cc_fc",
  "km_115_before_p_cc_fc",
  "km_115_before_a_cc_fc",
  "km_115_tran_l_cc_fc",
  "km_115_tran_p_cc_fc",
  "km_115_tran_a_cc_fc",
  "km_115_on_l_cc_fc",
  "km_115_on_p_cc_fc",
  "km_115_on_a_cc_fc",
  "km_115_before_l_cm_fc",
  "km_115_before_p_cm_fc",
  "km_115_before_a_cm_fc",
  "km_115_tran_l_cm_fc",
  "km_115_tran_p_cm_fc",
  "km_115_tran_a_cm_fc",
  "km_115_on_l_cm_fc",
  "km_115_on_p_cm_fc",
  "km_115_on_a_cm_fc",
  "km_12_before_l_cc_fc",
  "km_12_before_p_cc_fc",
  "km_12_before_a_cc_fc",
  "km_12_tran_l_cc_fc",
  "km_12_tran_p_cc_fc",
  "km_12_tran_a_cc_fc",
  "km_12_on_l_cc_fc",
  "km_12_on_p_cc_fc",
  "km_12_on_a_cc_fc",
  "km_12_before_l_cm_fc",
  "km_12_before_p_cm_fc",
  "km_12_before_a_cm_fc",
  "km_12_tran_l_cm_fc",
  "km_12_tran_p_cm_fc",
  "km_12_tran_a_cm_fc",
  "km_12_on_l_cm_fc",
  "km_12_on_p_cm_fc",
  "km_12_on_a_cm_fc",
  "km_125_before_l_cc_fc",
  "km_125_before_p_cc_fc",
  "km_125_before_a_cc_fc",
  "km_125_tran_l_cc_fc",
  "km_125_tran_p_cc_fc",
  "km_125_tran_a_cc_fc",
  "km_125_on_l_cc_fc",
  "km_125_on_p_cc_fc",
  "km_125_on_a_cc_fc",
  "km_125_before_l_cm_fc",
  "km_125_before_p_cm_fc",
  "km_125_before_a_cm_fc",
  "km_125_tran_l_cm_fc",
  "km_125_tran_p_cm_fc",
  "km_125_tran_a_cm_fc",
  "km_125_on_l_cm_fc",
  "km_125_on_p_cm_fc",
  "km_125_on_a_cm_fc",
  "km_13_before_l_cc_fc",
  "km_13_before_p_cc_fc",
  "km_13_before_a_cc_fc",
  "km_13_tran_l_cc_fc",
  "km_13_tran_p_cc_fc",
  "km_13_tran_a_cc_fc",
  "km_13_on_l_cc_fc",
  "km_13_on_p_cc_fc",
  "km_13_on_a_cc_fc",
  "km_13_before_l_cm_fc",
  "km_13_before_p_cm_fc",
  "km_13_before_a_cm_fc",
  "km_13_tran_l_cm_fc",
  "km_13_tran_p_cm_fc",
  "km_13_tran_a_cm_fc",
  "km_13_on_l_cm_fc",
  "km_13_on_p_cm_fc",
  "km_13_on_a_cm_fc",
  "km_135_before_l_cc_fc",
  "km_135_before_p_cc_fc",
  "km_135_before_a_cc_fc",
  "km_135_tran_l_cc_fc",
  "km_135_tran_p_cc_fc",
  "km_135_tran_a_cc_fc",
  "km_135_on_l_cc_fc",
  "km_135_on_p_cc_fc",
  "km_135_on_a_cc_fc",
  "km_135_before_l_cm_fc",
  "km_135_before_p_cm_fc",
  "km_135_before_a_cm_fc",
  "km_135_tran_l_cm_fc",
  "km_135_tran_p_cm_fc",
  "km_135_tran_a_cm_fc",
  "km_135_on_l_cm_fc",
  "km_135_on_p_cm_fc",
  "km_135_on_a_cm_fc",
  "km_14_before_l_cc_fc",
  "km_14_before_p_cc_fc",
  "km_14_before_a_cc_fc",
  "km_14_tran_l_cc_fc",
  "km_14_tran_p_cc_fc",
  "km_14_tran_a_cc_fc",
  "km_14_on_l_cc_fc",
  "km_14_on_p_cc_fc",
  "km_14_on_a_cc_fc",
  "km_14_before_l_cm_fc",
  "km_14_before_p_cm_fc",
  "km_14_before_a_cm_fc",
  "km_14_tran_l_cm_fc",
  "km_14_tran_p_cm_fc",
  "km_14_tran_a_cm_fc",
  "km_14_on_l_cm_fc",
  "km_14_on_p_cm_fc",
  "km_14_on_a_cm_fc" // 432 OR 576 total (i think)
];

class SurveyPAFB extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      redirect: false,
      startKm: 0,
      endKm: 7.0
    }

    this.nest_rowSumArr = [];
    this.nest_CCcolSumArr = [];
    this.nest_CMcolSumArr = [];
    this.falseCrawls_rowSumArr = [];
    this.falseCrawls_CCcolSumArr = [];
    this.falseCrawls_CMcolSumArr = [];

    let n = 0;
    for (let i = this.state.startKm; i < this.state.endKm; i += 0.5) {
      // Cc
      this.nest_rowSumArr[n] = React.createRef();
      this.falseCrawls_rowSumArr[n] = React.createRef();
      n++;
      // Cm
      this.nest_rowSumArr[n] = React.createRef();
      this.falseCrawls_rowSumArr[n] = React.createRef();
      n++;
    }
    for (let i = 0; i < 4; i++) {
      this.nest_CCcolSumArr[i] = React.createRef();
      this.nest_CMcolSumArr[i] = React.createRef();
    }
    for (let i = 0; i < 10; i++) {
      this.falseCrawls_CCcolSumArr[i] = React.createRef();
      this.falseCrawls_CMcolSumArr[i] = React.createRef();
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/new-report' />
    }
  }

  valToInt (val) {
    let output = parseInt(val);
    if (isNaN(output)) {
      return 0;
    }
    else {
      return output;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("In handleSubmit.");

    const data = {
      type : "pafb",
      date : this.state.date,
      initials : this.state.initials,
      notes : this.state.notes,
      emergences: [
      	{
      		stake_number_1: this.state.stake_num_1,
      		stake_number_2: this.state.stake_num_2
      	},
      	{
      		stake_number_1: this.state.stake_num_3,
      		stake_number_2: this.state.stake_num_4
      	}
      ],
      below_htl_cc_nest : this.valToInt( this.state.below_htl_cc_nest ),
      below_htl_cc_fc : this.valToInt( this.state.below_htl_cc_fc ),
      below_htl_cm_nest : this.valToInt( this.state.below_htl_cm_nest ),
      below_htl_cm_fc : this.valToInt( this.state.below_htl_cm_fc ),
      below_htl_dc_nest : this.valToInt( this.state.below_htl_dc_nest ),
      below_htl_dc_fc : this.valToInt( this.state.below_htl_dc_fc ),

      km_25_45s_0_b_cc_nests : this.valToInt( this.state.km_25_45s_0_b_cc_nests ),
      km_25_45s_0_t_cc_nests : this.valToInt( this.state.km_25_45s_0_t_cc_nests ),
      km_25_45s_0_o_cc_nests : this.valToInt( this.state.km_25_45s_0_o_cc_nests ),
      km_25_45s_0_b_cm_nests : this.valToInt( this.state.km_25_45s_0_b_cm_nests ),
      km_25_45s_0_t_cm_nests : this.valToInt( this.state.km_25_45s_0_t_cm_nests ),
      km_25_45s_0_o_cm_nests : this.valToInt( this.state.km_25_45s_0_o_cm_nests ),
      km_3_4s_05_b_cc_nests : this.valToInt( this.state.km_3_4s_05_b_cc_nests ),
      km_3_4s_05_t_cc_nests : this.valToInt( this.state.km_3_4s_05_t_cc_nests ),
      km_3_4s_05_o_cc_nests : this.valToInt( this.state.km_3_4s_05_o_cc_nests ),
      km_3_4s_05_b_cm_nests : this.valToInt( this.state.km_3_4s_05_b_cm_nests ),
      km_3_4s_05_t_cm_nests : this.valToInt( this.state.km_3_4s_05_t_cm_nests ),
      km_3_4s_05_o_cm_nests : this.valToInt( this.state.km_3_4s_05_o_cm_nests ),
      km_35_35s_1_b_cc_nests : this.valToInt( this.state.km_35_35s_1_b_cc_nests ),
      km_35_35s_1_t_cc_nests : this.valToInt( this.state.km_35_35s_1_t_cc_nests ),
      km_35_35s_1_o_cc_nests : this.valToInt( this.state.km_35_35s_1_o_cc_nests ),
      km_35_35s_1_b_cm_nests : this.valToInt( this.state.km_35_35s_1_b_cm_nests ),
      km_35_35s_1_t_cm_nests : this.valToInt( this.state.km_35_35s_1_t_cm_nests ),
      km_35_35s_1_o_cm_nests : this.valToInt( this.state.km_35_35s_1_o_cm_nests ),
      km_4_3s_15_b_cc_nests : this.valToInt( this.state.km_4_3s_15_b_cc_nests ),
      km_4_3s_15_t_cc_nests : this.valToInt( this.state.km_4_3s_15_t_cc_nests ),
      km_4_3s_15_o_cc_nests : this.valToInt( this.state.km_4_3s_15_o_cc_nests ),
      km_4_3s_15_b_cm_nests : this.valToInt( this.state.km_4_3s_15_b_cm_nests ),
      km_4_3s_15_t_cm_nests : this.valToInt( this.state.km_4_3s_15_t_cm_nests ),
      km_4_3s_15_o_cm_nests : this.valToInt( this.state.km_4_3s_15_o_cm_nests ),
      km_45_25s_2_b_cc_nests : this.valToInt( this.state.km_45_25s_2_b_cc_nests ),
      km_45_25s_2_t_cc_nests : this.valToInt( this.state.km_45_25s_2_t_cc_nests ),
      km_45_25s_2_o_cc_nests : this.valToInt( this.state.km_45_25s_2_o_cc_nests ),
      km_45_25s_2_b_cm_nests : this.valToInt( this.state.km_45_25s_2_b_cm_nests ),
      km_45_25s_2_t_cm_nests : this.valToInt( this.state.km_45_25s_2_t_cm_nests ),
      km_45_25s_2_o_cm_nests : this.valToInt( this.state.km_45_25s_2_o_cm_nests ),
      km_5_2s_25_b_cc_nests : this.valToInt( this.state.km_5_2s_25_b_cc_nests ),
      km_5_2s_25_t_cc_nests : this.valToInt( this.state.km_5_2s_25_t_cc_nests ),
      km_5_2s_25_o_cc_nests : this.valToInt( this.state.km_5_2s_25_o_cc_nests ),
      km_5_2s_25_b_cm_nests : this.valToInt( this.state.km_5_2s_25_b_cm_nests ),
      km_5_2s_25_t_cm_nests : this.valToInt( this.state.km_5_2s_25_t_cm_nests ),
      km_5_2s_25_o_cm_nests : this.valToInt( this.state.km_5_2s_25_o_cm_nests ),
      km_55_15s_3_b_cc_nests : this.valToInt( this.state.km_55_15s_3_b_cc_nests ),
      km_55_15s_3_t_cc_nests : this.valToInt( this.state.km_55_15s_3_t_cc_nests ),
      km_55_15s_3_o_cc_nests : this.valToInt( this.state.km_55_15s_3_o_cc_nests ),
      km_55_15s_3_b_cm_nests : this.valToInt( this.state.km_55_15s_3_b_cm_nests ),
      km_55_15s_3_t_cm_nests : this.valToInt( this.state.km_55_15s_3_t_cm_nests ),
      km_55_15s_3_o_cm_nests : this.valToInt( this.state.km_55_15s_3_o_cm_nests ),
      km_6_1s_35_b_cc_nests : this.valToInt( this.state.km_6_1s_35_b_cc_nests ),
      km_6_1s_35_t_cc_nests : this.valToInt( this.state.km_6_1s_35_t_cc_nests ),
      km_6_1s_35_o_cc_nests : this.valToInt( this.state.km_6_1s_35_o_cc_nests ),
      km_6_1s_35_b_cm_nests : this.valToInt( this.state.km_6_1s_35_b_cm_nests ),
      km_6_1s_35_t_cm_nests : this.valToInt( this.state.km_6_1s_35_t_cm_nests ),
      km_6_1s_35_o_cm_nests : this.valToInt( this.state.km_6_1s_35_o_cm_nests ),
      km_65_05s_4_b_cc_nests : this.valToInt( this.state.km_65_05s_4_b_cc_nests ),
      km_65_05s_4_t_cc_nests : this.valToInt( this.state.km_65_05s_4_t_cc_nests ),
      km_65_05s_4_o_cc_nests : this.valToInt( this.state.km_65_05s_4_o_cc_nests ),
      km_65_05s_4_b_cm_nests : this.valToInt( this.state.km_65_05s_4_b_cm_nests ),
      km_65_05s_4_t_cm_nests : this.valToInt( this.state.km_65_05s_4_t_cm_nests ),
      km_65_05s_4_o_cm_nests : this.valToInt( this.state.km_65_05s_4_o_cm_nests ),
      km_7_0s_45_b_cc_nests : this.valToInt( this.state.km_7_0s_45_b_cc_nests ),
      km_7_0s_45_t_cc_nests : this.valToInt( this.state.km_7_0s_45_t_cc_nests ),
      km_7_0s_45_o_cc_nests : this.valToInt( this.state.km_7_0s_45_o_cc_nests ),
      km_7_0s_45_b_cm_nests : this.valToInt( this.state.km_7_0s_45_b_cm_nests ),
      km_7_0s_45_t_cm_nests : this.valToInt( this.state.km_7_0s_45_t_cm_nests ),
      km_7_0s_45_o_cm_nests : this.valToInt( this.state.km_7_0s_45_o_cm_nests ),
      km_75_0n_5_b_cc_nests : this.valToInt( this.state.km_75_0n_5_b_cc_nests ),
      km_75_0n_5_t_cc_nests : this.valToInt( this.state.km_75_0n_5_t_cc_nests ),
      km_75_0n_5_o_cc_nests : this.valToInt( this.state.km_75_0n_5_o_cc_nests ),
      km_75_0n_5_b_cm_nests : this.valToInt( this.state.km_75_0n_5_b_cm_nests ),
      km_75_0n_5_t_cm_nests : this.valToInt( this.state.km_75_0n_5_t_cm_nests ),
      km_75_0n_5_o_cm_nests : this.valToInt( this.state.km_75_0n_5_o_cm_nests ),
      km_8_05n_55_b_cc_nests : this.valToInt( this.state.km_8_05n_55_b_cc_nests ),
      km_8_05n_55_t_cc_nests : this.valToInt( this.state.km_8_05n_55_t_cc_nests ),
      km_8_05n_55_o_cc_nests : this.valToInt( this.state.km_8_05n_55_o_cc_nests ),
      km_8_05n_55_b_cm_nests : this.valToInt( this.state.km_8_05n_55_b_cm_nests ),
      km_8_05n_55_t_cm_nests : this.valToInt( this.state.km_8_05n_55_t_cm_nests ),
      km_8_05n_55_o_cm_nests : this.valToInt( this.state.km_8_05n_55_o_cm_nests ),
      km_85_1n_6_b_cc_nests : this.valToInt( this.state.km_85_1n_6_b_cc_nests ),
      km_85_1n_6_t_cc_nests : this.valToInt( this.state.km_85_1n_6_t_cc_nests ),
      km_85_1n_6_o_cc_nests : this.valToInt( this.state.km_85_1n_6_o_cc_nests ),
      km_85_1n_6_b_cm_nests : this.valToInt( this.state.km_85_1n_6_b_cm_nests ),
      km_85_1n_6_t_cm_nests : this.valToInt( this.state.km_85_1n_6_t_cm_nests ),
      km_85_1n_6_o_cm_nests : this.valToInt( this.state.km_85_1n_6_o_cm_nests ),
      km_9_15n_65_b_cc_nests : this.valToInt( this.state.km_9_15n_65_b_cc_nests ),
      km_9_15n_65_t_cc_nests : this.valToInt( this.state.km_9_15n_65_t_cc_nests ),
      km_9_15n_65_o_cc_nests : this.valToInt( this.state.km_9_15n_65_o_cc_nests ),
      km_9_15n_65_b_cm_nests : this.valToInt( this.state.km_9_15n_65_b_cm_nests ),
      km_9_15n_65_t_cm_nests : this.valToInt( this.state.km_9_15n_65_t_cm_nests ),
      km_9_15n_65_o_cm_nests : this.valToInt( this.state.km_9_15n_65_o_cm_nests ),
      km_95_2n_b_cc_nests : this.valToInt( this.state.km_95_2n_b_cc_nests ),
      km_95_2n_t_cc_nests : this.valToInt( this.state.km_95_2n_t_cc_nests ),
      km_95_2n_o_cc_nests : this.valToInt( this.state.km_95_2n_o_cc_nests ),
      km_95_2n_b_cm_nests : this.valToInt( this.state.km_95_2n_b_cm_nests ),
      km_95_2n_t_cm_nests : this.valToInt( this.state.km_95_2n_t_cm_nests ),
      km_95_2n_o_cm_nests : this.valToInt( this.state.km_95_2n_o_cm_nests ),
      km_10_b_cc_nests : this.valToInt( this.state.km_10_b_cc_nests ),
      km_10_t_cc_nests : this.valToInt( this.state.km_10_t_cc_nests ),
      km_10_o_cc_nests : this.valToInt( this.state.km_10_o_cc_nests ),
      km_10_b_cm_nests : this.valToInt( this.state.km_10_b_cm_nests ),
      km_10_t_cm_nests : this.valToInt( this.state.km_10_t_cm_nests ),
      km_10_o_cm_nests : this.valToInt( this.state.km_10_o_cm_nests ),
      km_105_b_cc_nests : this.valToInt( this.state.km_105_b_cc_nests ),
      km_105_t_cc_nests : this.valToInt( this.state.km_105_t_cc_nests ),
      km_105_o_cc_nests : this.valToInt( this.state.km_105_o_cc_nests ),
      km_105_b_cm_nests : this.valToInt( this.state.km_105_b_cm_nests ),
      km_105_t_cm_nests : this.valToInt( this.state.km_105_t_cm_nests ),
      km_105_o_cm_nests : this.valToInt( this.state.km_105_o_cm_nests ),
      km_11_b_cc_nests : this.valToInt( this.state.km_11_b_cc_nests ),
      km_11_t_cc_nests : this.valToInt( this.state.km_11_t_cc_nests ),
      km_11_o_cc_nests : this.valToInt( this.state.km_11_o_cc_nests ),
      km_11_b_cm_nests : this.valToInt( this.state.km_11_b_cm_nests ),
      km_11_t_cm_nests : this.valToInt( this.state.km_11_t_cm_nests ),
      km_11_o_cm_nests : this.valToInt( this.state.km_11_o_cm_nests ),
      km_115_b_cc_nests : this.valToInt( this.state.km_115_b_cc_nests ),
      km_115_t_cc_nests : this.valToInt( this.state.km_115_t_cc_nests ),
      km_115_o_cc_nests : this.valToInt( this.state.km_115_o_cc_nests ),
      km_115_b_cm_nests : this.valToInt( this.state.km_115_b_cm_nests ),
      km_115_t_cm_nests : this.valToInt( this.state.km_115_t_cm_nests ),
      km_115_o_cm_nests : this.valToInt( this.state.km_115_o_cm_nests ),
      km_12_b_cc_nests : this.valToInt( this.state.km_12_b_cc_nests ),
      km_12_t_cc_nests : this.valToInt( this.state.km_12_t_cc_nests ),
      km_12_o_cc_nests : this.valToInt( this.state.km_12_o_cc_nests ),
      km_12_b_cm_nests : this.valToInt( this.state.km_12_b_cm_nests ),
      km_12_t_cm_nests : this.valToInt( this.state.km_12_t_cm_nests ),
      km_12_o_cm_nests : this.valToInt( this.state.km_12_o_cm_nests ),
      km_125_b_cc_nests : this.valToInt( this.state.km_125_b_cc_nests ),
      km_125_t_cc_nests : this.valToInt( this.state.km_125_t_cc_nests ),
      km_125_o_cc_nests : this.valToInt( this.state.km_125_o_cc_nests ),
      km_125_b_cm_nests : this.valToInt( this.state.km_125_b_cm_nests ),
      km_125_t_cm_nests : this.valToInt( this.state.km_125_t_cm_nests ),
      km_125_o_cm_nests : this.valToInt( this.state.km_125_o_cm_nests ),
      km_13_b_cc_nests : this.valToInt( this.state.km_13_b_cc_nests ),
      km_13_t_cc_nests : this.valToInt( this.state.km_13_t_cc_nests ),
      km_13_o_cc_nests : this.valToInt( this.state.km_13_o_cc_nests ),
      km_13_b_cm_nests : this.valToInt( this.state.km_13_b_cm_nests ),
      km_13_t_cm_nests : this.valToInt( this.state.km_13_t_cm_nests ),
      km_13_o_cm_nests : this.valToInt( this.state.km_13_o_cm_nests ),
      km_135_b_cc_nests : this.valToInt( this.state.km_135_b_cc_nests ),
      km_135_t_cc_nests : this.valToInt( this.state.km_135_t_cc_nests ),
      km_135_o_cc_nests : this.valToInt( this.state.km_135_o_cc_nests ),
      km_135_b_cm_nests : this.valToInt( this.state.km_135_b_cm_nests ),
      km_135_t_cm_nests : this.valToInt( this.state.km_135_t_cm_nests ),
      km_135_o_cm_nests : this.valToInt( this.state.km_135_o_cm_nests ),
      km_14_b_cc_nests : this.valToInt( this.state.km_14_b_cc_nests ),
      km_14_t_cc_nests : this.valToInt( this.state.km_14_t_cc_nests ),
      km_14_o_cc_nests : this.valToInt( this.state.km_14_o_cc_nests ),
      km_14_b_cm_nests : this.valToInt( this.state.km_14_b_cm_nests ),
      km_14_t_cm_nests : this.valToInt( this.state.km_14_t_cm_nests ),
      km_14_o_cm_nests : this.valToInt( this.state.km_14_o_cm_nests ),
      km_25_45s_0_before_l_cc_fc : this.valToInt( this.state.km_25_45s_0_before_l_cc_fc ),
      km_25_45s_0_before_p_cc_fc : this.valToInt( this.state.km_25_45s_0_before_p_cc_fc ),
      km_25_45s_0_before_a_cc_fc : this.valToInt( this.state.km_25_45s_0_before_a_cc_fc ),
      km_25_45s_0_tran_l_cc_fc : this.valToInt( this.state.km_25_45s_0_tran_l_cc_fc ),
      km_25_45s_0_tran_p_cc_fc : this.valToInt( this.state.km_25_45s_0_tran_p_cc_fc ),
      km_25_45s_0_tran_a_cc_fc : this.valToInt( this.state.km_25_45s_0_tran_a_cc_fc ),
      km_25_45s_0_on_l_cc_fc : this.valToInt( this.state.km_25_45s_0_on_l_cc_fc ),
      km_25_45s_0_on_p_cc_fc : this.valToInt( this.state.km_25_45s_0_on_p_cc_fc ),
      km_25_45s_0_on_a_cc_fc : this.valToInt( this.state.km_25_45s_0_on_a_cc_fc ),
      km_25_45s_0_before_l_cm_fc : this.valToInt( this.state.km_25_45s_0_before_l_cm_fc ),
      km_25_45s_0_before_p_cm_fc : this.valToInt( this.state.km_25_45s_0_before_p_cm_fc ),
      km_25_45s_0_before_a_cm_fc : this.valToInt( this.state.km_25_45s_0_before_a_cm_fc ),
      km_25_45s_0_tran_l_cm_fc : this.valToInt( this.state.km_25_45s_0_tran_l_cm_fc ),
      km_25_45s_0_tran_p_cm_fc : this.valToInt( this.state.km_25_45s_0_tran_p_cm_fc ),
      km_25_45s_0_tran_a_cm_fc : this.valToInt( this.state.km_25_45s_0_tran_a_cm_fc ),
      km_25_45s_0_on_l_cm_fc : this.valToInt( this.state.km_25_45s_0_on_l_cm_fc ),
      km_25_45s_0_on_p_cm_fc : this.valToInt( this.state.km_25_45s_0_on_p_cm_fc ),
      km_25_45s_0_on_a_cm_fc : this.valToInt( this.state.km_25_45s_0_on_a_cm_fc ),
      km_3_4s_05_before_l_cc_fc : this.valToInt( this.state.km_3_4s_05_before_l_cc_fc ),
      km_3_4s_05_before_p_cc_fc : this.valToInt( this.state.km_3_4s_05_before_p_cc_fc ),
      km_3_4s_05_before_a_cc_fc : this.valToInt( this.state.km_3_4s_05_before_a_cc_fc ),
      km_3_4s_05_tran_l_cc_fc : this.valToInt( this.state.km_3_4s_05_tran_l_cc_fc ),
      km_3_4s_05_tran_p_cc_fc : this.valToInt( this.state.km_3_4s_05_tran_p_cc_fc ),
      km_3_4s_05_tran_a_cc_fc : this.valToInt( this.state.km_3_4s_05_tran_a_cc_fc ),
      km_3_4s_05_on_l_cc_fc : this.valToInt( this.state.km_3_4s_05_on_l_cc_fc ),
      km_3_4s_05_on_p_cc_fc : this.valToInt( this.state.km_3_4s_05_on_p_cc_fc ),
      km_3_4s_05_on_a_cc_fc : this.valToInt( this.state.km_3_4s_05_on_a_cc_fc ),
      km_3_4s_05_before_l_cm_fc : this.valToInt( this.state.km_3_4s_05_before_l_cm_fc ),
      km_3_4s_05_before_p_cm_fc : this.valToInt( this.state.km_3_4s_05_before_p_cm_fc ),
      km_3_4s_05_before_a_cm_fc : this.valToInt( this.state.km_3_4s_05_before_a_cm_fc ),
      km_3_4s_05_tran_l_cm_fc : this.valToInt( this.state.km_3_4s_05_tran_l_cm_fc ),
      km_3_4s_05_tran_p_cm_fc : this.valToInt( this.state.km_3_4s_05_tran_p_cm_fc ),
      km_3_4s_05_tran_a_cm_fc : this.valToInt( this.state.km_3_4s_05_tran_a_cm_fc ),
      km_3_4s_05_on_l_cm_fc : this.valToInt( this.state.km_3_4s_05_on_l_cm_fc ),
      km_3_4s_05_on_p_cm_fc : this.valToInt( this.state.km_3_4s_05_on_p_cm_fc ),
      km_3_4s_05_on_a_cm_fc : this.valToInt( this.state.km_3_4s_05_on_a_cm_fc ),
      km_35_35s_1_before_l_cc_fc : this.valToInt( this.state.km_35_35s_1_before_l_cc_fc ),
      km_35_35s_1_before_p_cc_fc : this.valToInt( this.state.km_35_35s_1_before_p_cc_fc ),
      km_35_35s_1_before_a_cc_fc : this.valToInt( this.state.km_35_35s_1_before_a_cc_fc ),
      km_35_35s_1_tran_l_cc_fc : this.valToInt( this.state.km_35_35s_1_tran_l_cc_fc ),
      km_35_35s_1_tran_p_cc_fc : this.valToInt( this.state.km_35_35s_1_tran_p_cc_fc ),
      km_35_35s_1_tran_a_cc_fc : this.valToInt( this.state.km_35_35s_1_tran_a_cc_fc ),
      km_35_35s_1_on_l_cc_fc : this.valToInt( this.state.km_35_35s_1_on_l_cc_fc ),
      km_35_35s_1_on_p_cc_fc : this.valToInt( this.state.km_35_35s_1_on_p_cc_fc ),
      km_35_35s_1_on_a_cc_fc : this.valToInt( this.state.km_35_35s_1_on_a_cc_fc ),
      km_35_35s_1_before_l_cm_fc : this.valToInt( this.state.km_35_35s_1_before_l_cm_fc ),
      km_35_35s_1_before_p_cm_fc : this.valToInt( this.state.km_35_35s_1_before_p_cm_fc ),
      km_35_35s_1_before_a_cm_fc : this.valToInt( this.state.km_35_35s_1_before_a_cm_fc ),
      km_35_35s_1_tran_l_cm_fc : this.valToInt( this.state.km_35_35s_1_tran_l_cm_fc ),
      km_35_35s_1_tran_p_cm_fc : this.valToInt( this.state.km_35_35s_1_tran_p_cm_fc ),
      km_35_35s_1_tran_a_cm_fc : this.valToInt( this.state.km_35_35s_1_tran_a_cm_fc ),
      km_35_35s_1_on_l_cm_fc : this.valToInt( this.state.km_35_35s_1_on_l_cm_fc ),
      km_35_35s_1_on_p_cm_fc : this.valToInt( this.state.km_35_35s_1_on_p_cm_fc ),
      km_35_35s_1_on_a_cm_fc : this.valToInt( this.state.km_35_35s_1_on_a_cm_fc ),
      km_4_3s_15_before_l_cc_fc : this.valToInt( this.state.km_4_3s_15_before_l_cc_fc ),
      km_4_3s_15_before_p_cc_fc : this.valToInt( this.state.km_4_3s_15_before_p_cc_fc ),
      km_4_3s_15_before_a_cc_fc : this.valToInt( this.state.km_4_3s_15_before_a_cc_fc ),
      km_4_3s_15_tran_l_cc_fc : this.valToInt( this.state.km_4_3s_15_tran_l_cc_fc ),
      km_4_3s_15_tran_p_cc_fc : this.valToInt( this.state.km_4_3s_15_tran_p_cc_fc ),
      km_4_3s_15_tran_a_cc_fc : this.valToInt( this.state.km_4_3s_15_tran_a_cc_fc ),
      km_4_3s_15_on_l_cc_fc : this.valToInt( this.state.km_4_3s_15_on_l_cc_fc ),
      km_4_3s_15_on_p_cc_fc : this.valToInt( this.state.km_4_3s_15_on_p_cc_fc ),
      km_4_3s_15_on_a_cc_fc : this.valToInt( this.state.km_4_3s_15_on_a_cc_fc ),
      km_4_3s_15_before_l_cm_fc : this.valToInt( this.state.km_4_3s_15_before_l_cm_fc ),
      km_4_3s_15_before_p_cm_fc : this.valToInt( this.state.km_4_3s_15_before_p_cm_fc ),
      km_4_3s_15_before_a_cm_fc : this.valToInt( this.state.km_4_3s_15_before_a_cm_fc ),
      km_4_3s_15_tran_l_cm_fc : this.valToInt( this.state.km_4_3s_15_tran_l_cm_fc ),
      km_4_3s_15_tran_p_cm_fc : this.valToInt( this.state.km_4_3s_15_tran_p_cm_fc ),
      km_4_3s_15_tran_a_cm_fc : this.valToInt( this.state.km_4_3s_15_tran_a_cm_fc ),
      km_4_3s_15_on_l_cm_fc : this.valToInt( this.state.km_4_3s_15_on_l_cm_fc ),
      km_4_3s_15_on_p_cm_fc : this.valToInt( this.state.km_4_3s_15_on_p_cm_fc ),
      km_4_3s_15_on_a_cm_fc : this.valToInt( this.state.km_4_3s_15_on_a_cm_fc ),
      km_45_25s_2_before_l_cc_fc : this.valToInt( this.state.km_45_25s_2_before_l_cc_fc ),
      km_45_25s_2_before_p_cc_fc : this.valToInt( this.state.km_45_25s_2_before_p_cc_fc ),
      km_45_25s_2_before_a_cc_fc : this.valToInt( this.state.km_45_25s_2_before_a_cc_fc ),
      km_45_25s_2_tran_l_cc_fc : this.valToInt( this.state.km_45_25s_2_tran_l_cc_fc ),
      km_45_25s_2_tran_p_cc_fc : this.valToInt( this.state.km_45_25s_2_tran_p_cc_fc ),
      km_45_25s_2_tran_a_cc_fc : this.valToInt( this.state.km_45_25s_2_tran_a_cc_fc ),
      km_45_25s_2_on_l_cc_fc : this.valToInt( this.state.km_45_25s_2_on_l_cc_fc ),
      km_45_25s_2_on_p_cc_fc : this.valToInt( this.state.km_45_25s_2_on_p_cc_fc ),
      km_45_25s_2_on_a_cc_fc : this.valToInt( this.state.km_45_25s_2_on_a_cc_fc ),
      km_45_25s_2_before_l_cm_fc : this.valToInt( this.state.km_45_25s_2_before_l_cm_fc ),
      km_45_25s_2_before_p_cm_fc : this.valToInt( this.state.km_45_25s_2_before_p_cm_fc ),
      km_45_25s_2_before_a_cm_fc : this.valToInt( this.state.km_45_25s_2_before_a_cm_fc ),
      km_45_25s_2_tran_l_cm_fc : this.valToInt( this.state.km_45_25s_2_tran_l_cm_fc ),
      km_45_25s_2_tran_p_cm_fc : this.valToInt( this.state.km_45_25s_2_tran_p_cm_fc ),
      km_45_25s_2_tran_a_cm_fc : this.valToInt( this.state.km_45_25s_2_tran_a_cm_fc ),
      km_45_25s_2_on_l_cm_fc : this.valToInt( this.state.km_45_25s_2_on_l_cm_fc ),
      km_45_25s_2_on_p_cm_fc : this.valToInt( this.state.km_45_25s_2_on_p_cm_fc ),
      km_45_25s_2_on_a_cm_fc : this.valToInt( this.state.km_45_25s_2_on_a_cm_fc ),
      km_5_2s_25_before_l_cc_fc : this.valToInt( this.state.km_5_2s_25_before_l_cc_fc ),
      km_5_2s_25_before_p_cc_fc : this.valToInt( this.state.km_5_2s_25_before_p_cc_fc ),
      km_5_2s_25_before_a_cc_fc : this.valToInt( this.state.km_5_2s_25_before_a_cc_fc ),
      km_5_2s_25_tran_l_cc_fc : this.valToInt( this.state.km_5_2s_25_tran_l_cc_fc ),
      km_5_2s_25_tran_p_cc_fc : this.valToInt( this.state.km_5_2s_25_tran_p_cc_fc ),
      km_5_2s_25_tran_a_cc_fc : this.valToInt( this.state.km_5_2s_25_tran_a_cc_fc ),
      km_5_2s_25_on_l_cc_fc : this.valToInt( this.state.km_5_2s_25_on_l_cc_fc ),
      km_5_2s_25_on_p_cc_fc : this.valToInt( this.state.km_5_2s_25_on_p_cc_fc ),
      km_5_2s_25_on_a_cc_fc : this.valToInt( this.state.km_5_2s_25_on_a_cc_fc ),
      km_5_2s_25_before_l_cm_fc : this.valToInt( this.state.km_5_2s_25_before_l_cm_fc ),
      km_5_2s_25_before_p_cm_fc : this.valToInt( this.state.km_5_2s_25_before_p_cm_fc ),
      km_5_2s_25_before_a_cm_fc : this.valToInt( this.state.km_5_2s_25_before_a_cm_fc ),
      km_5_2s_25_tran_l_cm_fc : this.valToInt( this.state.km_5_2s_25_tran_l_cm_fc ),
      km_5_2s_25_tran_p_cm_fc : this.valToInt( this.state.km_5_2s_25_tran_p_cm_fc ),
      km_5_2s_25_tran_a_cm_fc : this.valToInt( this.state.km_5_2s_25_tran_a_cm_fc ),
      km_5_2s_25_on_l_cm_fc : this.valToInt( this.state.km_5_2s_25_on_l_cm_fc ),
      km_5_2s_25_on_p_cm_fc : this.valToInt( this.state.km_5_2s_25_on_p_cm_fc ),
      km_5_2s_25_on_a_cm_fc : this.valToInt( this.state.km_5_2s_25_on_a_cm_fc ),
      km_55_15s_3_before_l_cc_fc : this.valToInt( this.state.km_55_15s_3_before_l_cc_fc ),
      km_55_15s_3_before_p_cc_fc : this.valToInt( this.state.km_55_15s_3_before_p_cc_fc ),
      km_55_15s_3_before_a_cc_fc : this.valToInt( this.state.km_55_15s_3_before_a_cc_fc ),
      km_55_15s_3_tran_l_cc_fc : this.valToInt( this.state.km_55_15s_3_tran_l_cc_fc ),
      km_55_15s_3_tran_p_cc_fc : this.valToInt( this.state.km_55_15s_3_tran_p_cc_fc ),
      km_55_15s_3_tran_a_cc_fc : this.valToInt( this.state.km_55_15s_3_tran_a_cc_fc ),
      km_55_15s_3_on_l_cc_fc : this.valToInt( this.state.km_55_15s_3_on_l_cc_fc ),
      km_55_15s_3_on_p_cc_fc : this.valToInt( this.state.km_55_15s_3_on_p_cc_fc ),
      km_55_15s_3_on_a_cc_fc : this.valToInt( this.state.km_55_15s_3_on_a_cc_fc ),
      km_55_15s_3_before_l_cm_fc : this.valToInt( this.state.km_55_15s_3_before_l_cm_fc ),
      km_55_15s_3_before_p_cm_fc : this.valToInt( this.state.km_55_15s_3_before_p_cm_fc ),
      km_55_15s_3_before_a_cm_fc : this.valToInt( this.state.km_55_15s_3_before_a_cm_fc ),
      km_55_15s_3_tran_l_cm_fc : this.valToInt( this.state.km_55_15s_3_tran_l_cm_fc ),
      km_55_15s_3_tran_p_cm_fc : this.valToInt( this.state.km_55_15s_3_tran_p_cm_fc ),
      km_55_15s_3_tran_a_cm_fc : this.valToInt( this.state.km_55_15s_3_tran_a_cm_fc ),
      km_55_15s_3_on_l_cm_fc : this.valToInt( this.state.km_55_15s_3_on_l_cm_fc ),
      km_55_15s_3_on_p_cm_fc : this.valToInt( this.state.km_55_15s_3_on_p_cm_fc ),
      km_55_15s_3_on_a_cm_fc : this.valToInt( this.state.km_55_15s_3_on_a_cm_fc ),
      km_6_1s_35_before_l_cc_fc : this.valToInt( this.state.km_6_1s_35_before_l_cc_fc ),
      km_6_1s_35_before_p_cc_fc : this.valToInt( this.state.km_6_1s_35_before_p_cc_fc ),
      km_6_1s_35_before_a_cc_fc : this.valToInt( this.state.km_6_1s_35_before_a_cc_fc ),
      km_6_1s_35_tran_l_cc_fc : this.valToInt( this.state.km_6_1s_35_tran_l_cc_fc ),
      km_6_1s_35_tran_p_cc_fc : this.valToInt( this.state.km_6_1s_35_tran_p_cc_fc ),
      km_6_1s_35_tran_a_cc_fc : this.valToInt( this.state.km_6_1s_35_tran_a_cc_fc ),
      km_6_1s_35_on_l_cc_fc : this.valToInt( this.state.km_6_1s_35_on_l_cc_fc ),
      km_6_1s_35_on_p_cc_fc : this.valToInt( this.state.km_6_1s_35_on_p_cc_fc ),
      km_6_1s_35_on_a_cc_fc : this.valToInt( this.state.km_6_1s_35_on_a_cc_fc ),
      km_6_1s_35_before_l_cm_fc : this.valToInt( this.state.km_6_1s_35_before_l_cm_fc ),
      km_6_1s_35_before_p_cm_fc : this.valToInt( this.state.km_6_1s_35_before_p_cm_fc ),
      km_6_1s_35_before_a_cm_fc : this.valToInt( this.state.km_6_1s_35_before_a_cm_fc ),
      km_6_1s_35_tran_l_cm_fc : this.valToInt( this.state.km_6_1s_35_tran_l_cm_fc ),
      km_6_1s_35_tran_p_cm_fc : this.valToInt( this.state.km_6_1s_35_tran_p_cm_fc ),
      km_6_1s_35_tran_a_cm_fc : this.valToInt( this.state.km_6_1s_35_tran_a_cm_fc ),
      km_6_1s_35_on_l_cm_fc : this.valToInt( this.state.km_6_1s_35_on_l_cm_fc ),
      km_6_1s_35_on_p_cm_fc : this.valToInt( this.state.km_6_1s_35_on_p_cm_fc ),
      km_6_1s_35_on_a_cm_fc : this.valToInt( this.state.km_6_1s_35_on_a_cm_fc ),
      km_65_05s_4_before_l_cc_fc : this.valToInt( this.state.km_65_05s_4_before_l_cc_fc ),
      km_65_05s_4_before_p_cc_fc : this.valToInt( this.state.km_65_05s_4_before_p_cc_fc ),
      km_65_05s_4_before_a_cc_fc : this.valToInt( this.state.km_65_05s_4_before_a_cc_fc ),
      km_65_05s_4_tran_l_cc_fc : this.valToInt( this.state.km_65_05s_4_tran_l_cc_fc ),
      km_65_05s_4_tran_p_cc_fc : this.valToInt( this.state.km_65_05s_4_tran_p_cc_fc ),
      km_65_05s_4_tran_a_cc_fc : this.valToInt( this.state.km_65_05s_4_tran_a_cc_fc ),
      km_65_05s_4_on_l_cc_fc : this.valToInt( this.state.km_65_05s_4_on_l_cc_fc ),
      km_65_05s_4_on_p_cc_fc : this.valToInt( this.state.km_65_05s_4_on_p_cc_fc ),
      km_65_05s_4_on_a_cc_fc : this.valToInt( this.state.km_65_05s_4_on_a_cc_fc ),
      km_65_05s_4_before_l_cm_fc : this.valToInt( this.state.km_65_05s_4_before_l_cm_fc ),
      km_65_05s_4_before_p_cm_fc : this.valToInt( this.state.km_65_05s_4_before_p_cm_fc ),
      km_65_05s_4_before_a_cm_fc : this.valToInt( this.state.km_65_05s_4_before_a_cm_fc ),
      km_65_05s_4_tran_l_cm_fc : this.valToInt( this.state.km_65_05s_4_tran_l_cm_fc ),
      km_65_05s_4_tran_p_cm_fc : this.valToInt( this.state.km_65_05s_4_tran_p_cm_fc ),
      km_65_05s_4_tran_a_cm_fc : this.valToInt( this.state.km_65_05s_4_tran_a_cm_fc ),
      km_65_05s_4_on_l_cm_fc : this.valToInt( this.state.km_65_05s_4_on_l_cm_fc ),
      km_65_05s_4_on_p_cm_fc : this.valToInt( this.state.km_65_05s_4_on_p_cm_fc ),
      km_65_05s_4_on_a_cm_fc : this.valToInt( this.state.km_65_05s_4_on_a_cm_fc ),
      km_7_0s_45_before_l_cc_fc : this.valToInt( this.state.km_7_0s_45_before_l_cc_fc ),
      km_7_0s_45_before_p_cc_fc : this.valToInt( this.state.km_7_0s_45_before_p_cc_fc ),
      km_7_0s_45_before_a_cc_fc : this.valToInt( this.state.km_7_0s_45_before_a_cc_fc ),
      km_7_0s_45_tran_l_cc_fc : this.valToInt( this.state.km_7_0s_45_tran_l_cc_fc ),
      km_7_0s_45_tran_p_cc_fc : this.valToInt( this.state.km_7_0s_45_tran_p_cc_fc ),
      km_7_0s_45_tran_a_cc_fc : this.valToInt( this.state.km_7_0s_45_tran_a_cc_fc ),
      km_7_0s_45_on_l_cc_fc : this.valToInt( this.state.km_7_0s_45_on_l_cc_fc ),
      km_7_0s_45_on_p_cc_fc : this.valToInt( this.state.km_7_0s_45_on_p_cc_fc ),
      km_7_0s_45_on_a_cc_fc : this.valToInt( this.state.km_7_0s_45_on_a_cc_fc ),
      km_7_0s_45_before_l_cm_fc : this.valToInt( this.state.km_7_0s_45_before_l_cm_fc ),
      km_7_0s_45_before_p_cm_fc : this.valToInt( this.state.km_7_0s_45_before_p_cm_fc ),
      km_7_0s_45_before_a_cm_fc : this.valToInt( this.state.km_7_0s_45_before_a_cm_fc ),
      km_7_0s_45_tran_l_cm_fc : this.valToInt( this.state.km_7_0s_45_tran_l_cm_fc ),
      km_7_0s_45_tran_p_cm_fc : this.valToInt( this.state.km_7_0s_45_tran_p_cm_fc ),
      km_7_0s_45_tran_a_cm_fc : this.valToInt( this.state.km_7_0s_45_tran_a_cm_fc ),
      km_7_0s_45_on_l_cm_fc : this.valToInt( this.state.km_7_0s_45_on_l_cm_fc ),
      km_7_0s_45_on_p_cm_fc : this.valToInt( this.state.km_7_0s_45_on_p_cm_fc ),
      km_7_0s_45_on_a_cm_fc : this.valToInt( this.state.km_7_0s_45_on_a_cm_fc ),
      km_75_0n_5_before_l_cc_fc : this.valToInt( this.state.km_75_0n_5_before_l_cc_fc ),
      km_75_0n_5_before_p_cc_fc : this.valToInt( this.state.km_75_0n_5_before_p_cc_fc ),
      km_75_0n_5_before_a_cc_fc : this.valToInt( this.state.km_75_0n_5_before_a_cc_fc ),
      km_75_0n_5_tran_l_cc_fc : this.valToInt( this.state.km_75_0n_5_tran_l_cc_fc ),
      km_75_0n_5_tran_p_cc_fc : this.valToInt( this.state.km_75_0n_5_tran_p_cc_fc ),
      km_75_0n_5_tran_a_cc_fc : this.valToInt( this.state.km_75_0n_5_tran_a_cc_fc ),
      km_75_0n_5_on_l_cc_fc : this.valToInt( this.state.km_75_0n_5_on_l_cc_fc ),
      km_75_0n_5_on_p_cc_fc : this.valToInt( this.state.km_75_0n_5_on_p_cc_fc ),
      km_75_0n_5_on_a_cc_fc : this.valToInt( this.state.km_75_0n_5_on_a_cc_fc ),
      km_75_0n_5_before_l_cm_fc : this.valToInt( this.state.km_75_0n_5_before_l_cm_fc ),
      km_75_0n_5_before_p_cm_fc : this.valToInt( this.state.km_75_0n_5_before_p_cm_fc ),
      km_75_0n_5_before_a_cm_fc : this.valToInt( this.state.km_75_0n_5_before_a_cm_fc ),
      km_75_0n_5_tran_l_cm_fc : this.valToInt( this.state.km_75_0n_5_tran_l_cm_fc ),
      km_75_0n_5_tran_p_cm_fc : this.valToInt( this.state.km_75_0n_5_tran_p_cm_fc ),
      km_75_0n_5_tran_a_cm_fc : this.valToInt( this.state.km_75_0n_5_tran_a_cm_fc ),
      km_75_0n_5_on_l_cm_fc : this.valToInt( this.state.km_75_0n_5_on_l_cm_fc ),
      km_75_0n_5_on_p_cm_fc : this.valToInt( this.state.km_75_0n_5_on_p_cm_fc ),
      km_75_0n_5_on_a_cm_fc : this.valToInt( this.state.km_75_0n_5_on_a_cm_fc ),
      km_8_05n_55_before_l_cc_fc : this.valToInt( this.state.km_8_05n_55_before_l_cc_fc ),
      km_8_05n_55_before_p_cc_fc : this.valToInt( this.state.km_8_05n_55_before_p_cc_fc ),
      km_8_05n_55_before_a_cc_fc : this.valToInt( this.state.km_8_05n_55_before_a_cc_fc ),
      km_8_05n_55_tran_l_cc_fc : this.valToInt( this.state.km_8_05n_55_tran_l_cc_fc ),
      km_8_05n_55_tran_p_cc_fc : this.valToInt( this.state.km_8_05n_55_tran_p_cc_fc ),
      km_8_05n_55_tran_a_cc_fc : this.valToInt( this.state.km_8_05n_55_tran_a_cc_fc ),
      km_8_05n_55_on_l_cc_fc : this.valToInt( this.state.km_8_05n_55_on_l_cc_fc ),
      km_8_05n_55_on_p_cc_fc : this.valToInt( this.state.km_8_05n_55_on_p_cc_fc ),
      km_8_05n_55_on_a_cc_fc : this.valToInt( this.state.km_8_05n_55_on_a_cc_fc ),
      km_8_05n_55_before_l_cm_fc : this.valToInt( this.state.km_8_05n_55_before_l_cm_fc ),
      km_8_05n_55_before_p_cm_fc : this.valToInt( this.state.km_8_05n_55_before_p_cm_fc ),
      km_8_05n_55_before_a_cm_fc : this.valToInt( this.state.km_8_05n_55_before_a_cm_fc ),
      km_8_05n_55_tran_l_cm_fc : this.valToInt( this.state.km_8_05n_55_tran_l_cm_fc ),
      km_8_05n_55_tran_p_cm_fc : this.valToInt( this.state.km_8_05n_55_tran_p_cm_fc ),
      km_8_05n_55_tran_a_cm_fc : this.valToInt( this.state.km_8_05n_55_tran_a_cm_fc ),
      km_8_05n_55_on_l_cm_fc : this.valToInt( this.state.km_8_05n_55_on_l_cm_fc ),
      km_8_05n_55_on_p_cm_fc : this.valToInt( this.state.km_8_05n_55_on_p_cm_fc ),
      km_8_05n_55_on_a_cm_fc : this.valToInt( this.state.km_8_05n_55_on_a_cm_fc ),
      km_85_1n_6_before_l_cc_fc : this.valToInt( this.state.km_85_1n_6_before_l_cc_fc ),
      km_85_1n_6_before_p_cc_fc : this.valToInt( this.state.km_85_1n_6_before_p_cc_fc ),
      km_85_1n_6_before_a_cc_fc : this.valToInt( this.state.km_85_1n_6_before_a_cc_fc ),
      km_85_1n_6_tran_l_cc_fc : this.valToInt( this.state.km_85_1n_6_tran_l_cc_fc ),
      km_85_1n_6_tran_p_cc_fc : this.valToInt( this.state.km_85_1n_6_tran_p_cc_fc ),
      km_85_1n_6_tran_a_cc_fc : this.valToInt( this.state.km_85_1n_6_tran_a_cc_fc ),
      km_85_1n_6_on_l_cc_fc : this.valToInt( this.state.km_85_1n_6_on_l_cc_fc ),
      km_85_1n_6_on_p_cc_fc : this.valToInt( this.state.km_85_1n_6_on_p_cc_fc ),
      km_85_1n_6_on_a_cc_fc : this.valToInt( this.state.km_85_1n_6_on_a_cc_fc ),
      km_85_1n_6_before_l_cm_fc : this.valToInt( this.state.km_85_1n_6_before_l_cm_fc ),
      km_85_1n_6_before_p_cm_fc : this.valToInt( this.state.km_85_1n_6_before_p_cm_fc ),
      km_85_1n_6_before_a_cm_fc : this.valToInt( this.state.km_85_1n_6_before_a_cm_fc ),
      km_85_1n_6_tran_l_cm_fc : this.valToInt( this.state.km_85_1n_6_tran_l_cm_fc ),
      km_85_1n_6_tran_p_cm_fc : this.valToInt( this.state.km_85_1n_6_tran_p_cm_fc ),
      km_85_1n_6_tran_a_cm_fc : this.valToInt( this.state.km_85_1n_6_tran_a_cm_fc ),
      km_85_1n_6_on_l_cm_fc : this.valToInt( this.state.km_85_1n_6_on_l_cm_fc ),
      km_85_1n_6_on_p_cm_fc : this.valToInt( this.state.km_85_1n_6_on_p_cm_fc ),
      km_85_1n_6_on_a_cm_fc : this.valToInt( this.state.km_85_1n_6_on_a_cm_fc ),
      km_9_15n_65_before_l_cc_fc : this.valToInt( this.state.km_9_15n_65_before_l_cc_fc ),
      km_9_15n_65_before_p_cc_fc : this.valToInt( this.state.km_9_15n_65_before_p_cc_fc ),
      km_9_15n_65_before_a_cc_fc : this.valToInt( this.state.km_9_15n_65_before_a_cc_fc ),
      km_9_15n_65_tran_l_cc_fc : this.valToInt( this.state.km_9_15n_65_tran_l_cc_fc ),
      km_9_15n_65_tran_p_cc_fc : this.valToInt( this.state.km_9_15n_65_tran_p_cc_fc ),
      km_9_15n_65_tran_a_cc_fc : this.valToInt( this.state.km_9_15n_65_tran_a_cc_fc ),
      km_9_15n_65_on_l_cc_fc : this.valToInt( this.state.km_9_15n_65_on_l_cc_fc ),
      km_9_15n_65_on_p_cc_fc : this.valToInt( this.state.km_9_15n_65_on_p_cc_fc ),
      km_9_15n_65_on_a_cc_fc : this.valToInt( this.state.km_9_15n_65_on_a_cc_fc ),
      km_9_15n_65_before_l_cm_fc : this.valToInt( this.state.km_9_15n_65_before_l_cm_fc ),
      km_9_15n_65_before_p_cm_fc : this.valToInt( this.state.km_9_15n_65_before_p_cm_fc ),
      km_9_15n_65_before_a_cm_fc : this.valToInt( this.state.km_9_15n_65_before_a_cm_fc ),
      km_9_15n_65_tran_l_cm_fc : this.valToInt( this.state.km_9_15n_65_tran_l_cm_fc ),
      km_9_15n_65_tran_p_cm_fc : this.valToInt( this.state.km_9_15n_65_tran_p_cm_fc ),
      km_9_15n_65_tran_a_cm_fc : this.valToInt( this.state.km_9_15n_65_tran_a_cm_fc ),
      km_9_15n_65_on_l_cm_fc : this.valToInt( this.state.km_9_15n_65_on_l_cm_fc ),
      km_9_15n_65_on_p_cm_fc : this.valToInt( this.state.km_9_15n_65_on_p_cm_fc ),
      km_9_15n_65_on_a_cm_fc : this.valToInt( this.state.km_9_15n_65_on_a_cm_fc ),
      km_95_2n_before_l_cc_fc : this.valToInt( this.state.km_95_2n_before_l_cc_fc ),
      km_95_2n_before_p_cc_fc : this.valToInt( this.state.km_95_2n_before_p_cc_fc ),
      km_95_2n_before_a_cc_fc : this.valToInt( this.state.km_95_2n_before_a_cc_fc ),
      km_95_2n_tran_l_cc_fc : this.valToInt( this.state.km_95_2n_tran_l_cc_fc ),
      km_95_2n_tran_p_cc_fc : this.valToInt( this.state.km_95_2n_tran_p_cc_fc ),
      km_95_2n_tran_a_cc_fc : this.valToInt( this.state.km_95_2n_tran_a_cc_fc ),
      km_95_2n_on_l_cc_fc : this.valToInt( this.state.km_95_2n_on_l_cc_fc ),
      km_95_2n_on_p_cc_fc : this.valToInt( this.state.km_95_2n_on_p_cc_fc ),
      km_95_2n_on_a_cc_fc : this.valToInt( this.state.km_95_2n_on_a_cc_fc ),
      km_95_2n_before_l_cm_fc : this.valToInt( this.state.km_95_2n_before_l_cm_fc ),
      km_95_2n_before_p_cm_fc : this.valToInt( this.state.km_95_2n_before_p_cm_fc ),
      km_95_2n_before_a_cm_fc : this.valToInt( this.state.km_95_2n_before_a_cm_fc ),
      km_95_2n_tran_l_cm_fc : this.valToInt( this.state.km_95_2n_tran_l_cm_fc ),
      km_95_2n_tran_p_cm_fc : this.valToInt( this.state.km_95_2n_tran_p_cm_fc ),
      km_95_2n_tran_a_cm_fc : this.valToInt( this.state.km_95_2n_tran_a_cm_fc ),
      km_95_2n_on_l_cm_fc : this.valToInt( this.state.km_95_2n_on_l_cm_fc ),
      km_95_2n_on_p_cm_fc : this.valToInt( this.state.km_95_2n_on_p_cm_fc ),
      km_95_2n_on_a_cm_fc : this.valToInt( this.state.km_95_2n_on_a_cm_fc ),
      km_10_before_l_cc_fc : this.valToInt( this.state.km_10_before_l_cc_fc ),
      km_10_before_p_cc_fc : this.valToInt( this.state.km_10_before_p_cc_fc ),
      km_10_before_a_cc_fc : this.valToInt( this.state.km_10_before_a_cc_fc ),
      km_10_tran_l_cc_fc : this.valToInt( this.state.km_10_tran_l_cc_fc ),
      km_10_tran_p_cc_fc : this.valToInt( this.state.km_10_tran_p_cc_fc ),
      km_10_tran_a_cc_fc : this.valToInt( this.state.km_10_tran_a_cc_fc ),
      km_10_on_l_cc_fc : this.valToInt( this.state.km_10_on_l_cc_fc ),
      km_10_on_p_cc_fc : this.valToInt( this.state.km_10_on_p_cc_fc ),
      km_10_on_a_cc_fc : this.valToInt( this.state.km_10_on_a_cc_fc ),
      km_10_before_l_cm_fc : this.valToInt( this.state.km_10_before_l_cm_fc ),
      km_10_before_p_cm_fc : this.valToInt( this.state.km_10_before_p_cm_fc ),
      km_10_before_a_cm_fc : this.valToInt( this.state.km_10_before_a_cm_fc ),
      km_10_tran_l_cm_fc : this.valToInt( this.state.km_10_tran_l_cm_fc ),
      km_10_tran_p_cm_fc : this.valToInt( this.state.km_10_tran_p_cm_fc ),
      km_10_tran_a_cm_fc : this.valToInt( this.state.km_10_tran_a_cm_fc ),
      km_10_on_l_cm_fc : this.valToInt( this.state.km_10_on_l_cm_fc ),
      km_10_on_p_cm_fc : this.valToInt( this.state.km_10_on_p_cm_fc ),
      km_10_on_a_cm_fc : this.valToInt( this.state.km_10_on_a_cm_fc ),
      km_105_before_l_cc_fc : this.valToInt( this.state.km_105_before_l_cc_fc ),
      km_105_before_p_cc_fc : this.valToInt( this.state.km_105_before_p_cc_fc ),
      km_105_before_a_cc_fc : this.valToInt( this.state.km_105_before_a_cc_fc ),
      km_105_tran_l_cc_fc : this.valToInt( this.state.km_105_tran_l_cc_fc ),
      km_105_tran_p_cc_fc : this.valToInt( this.state.km_105_tran_p_cc_fc ),
      km_105_tran_a_cc_fc : this.valToInt( this.state.km_105_tran_a_cc_fc ),
      km_105_on_l_cc_fc : this.valToInt( this.state.km_105_on_l_cc_fc ),
      km_105_on_p_cc_fc : this.valToInt( this.state.km_105_on_p_cc_fc ),
      km_105_on_a_cc_fc : this.valToInt( this.state.km_105_on_a_cc_fc ),
      km_105_before_l_cm_fc : this.valToInt( this.state.km_105_before_l_cm_fc ),
      km_105_before_p_cm_fc : this.valToInt( this.state.km_105_before_p_cm_fc ),
      km_105_before_a_cm_fc : this.valToInt( this.state.km_105_before_a_cm_fc ),
      km_105_tran_l_cm_fc : this.valToInt( this.state.km_105_tran_l_cm_fc ),
      km_105_tran_p_cm_fc : this.valToInt( this.state.km_105_tran_p_cm_fc ),
      km_105_tran_a_cm_fc : this.valToInt( this.state.km_105_tran_a_cm_fc ),
      km_105_on_l_cm_fc : this.valToInt( this.state.km_105_on_l_cm_fc ),
      km_105_on_p_cm_fc : this.valToInt( this.state.km_105_on_p_cm_fc ),
      km_105_on_a_cm_fc : this.valToInt( this.state.km_105_on_a_cm_fc ),
      km_11_before_l_cc_fc : this.valToInt( this.state.km_11_before_l_cc_fc ),
      km_11_before_p_cc_fc : this.valToInt( this.state.km_11_before_p_cc_fc ),
      km_11_before_a_cc_fc : this.valToInt( this.state.km_11_before_a_cc_fc ),
      km_11_tran_l_cc_fc : this.valToInt( this.state.km_11_tran_l_cc_fc ),
      km_11_tran_p_cc_fc : this.valToInt( this.state.km_11_tran_p_cc_fc ),
      km_11_tran_a_cc_fc : this.valToInt( this.state.km_11_tran_a_cc_fc ),
      km_11_on_l_cc_fc : this.valToInt( this.state.km_11_on_l_cc_fc ),
      km_11_on_p_cc_fc : this.valToInt( this.state.km_11_on_p_cc_fc ),
      km_11_on_a_cc_fc : this.valToInt( this.state.km_11_on_a_cc_fc ),
      km_11_before_l_cm_fc : this.valToInt( this.state.km_11_before_l_cm_fc ),
      km_11_before_p_cm_fc : this.valToInt( this.state.km_11_before_p_cm_fc ),
      km_11_before_a_cm_fc : this.valToInt( this.state.km_11_before_a_cm_fc ),
      km_11_tran_l_cm_fc : this.valToInt( this.state.km_11_tran_l_cm_fc ),
      km_11_tran_p_cm_fc : this.valToInt( this.state.km_11_tran_p_cm_fc ),
      km_11_tran_a_cm_fc : this.valToInt( this.state.km_11_tran_a_cm_fc ),
      km_11_on_l_cm_fc : this.valToInt( this.state.km_11_on_l_cm_fc ),
      km_11_on_p_cm_fc : this.valToInt( this.state.km_11_on_p_cm_fc ),
      km_11_on_a_cm_fc : this.valToInt( this.state.km_11_on_a_cm_fc ),
      km_115_before_l_cc_fc : this.valToInt( this.state.km_115_before_l_cc_fc ),
      km_115_before_p_cc_fc : this.valToInt( this.state.km_115_before_p_cc_fc ),
      km_115_before_a_cc_fc : this.valToInt( this.state.km_115_before_a_cc_fc ),
      km_115_tran_l_cc_fc : this.valToInt( this.state.km_115_tran_l_cc_fc ),
      km_115_tran_p_cc_fc : this.valToInt( this.state.km_115_tran_p_cc_fc ),
      km_115_tran_a_cc_fc : this.valToInt( this.state.km_115_tran_a_cc_fc ),
      km_115_on_l_cc_fc : this.valToInt( this.state.km_115_on_l_cc_fc ),
      km_115_on_p_cc_fc : this.valToInt( this.state.km_115_on_p_cc_fc ),
      km_115_on_a_cc_fc : this.valToInt( this.state.km_115_on_a_cc_fc ),
      km_115_before_l_cm_fc : this.valToInt( this.state.km_115_before_l_cm_fc ),
      km_115_before_p_cm_fc : this.valToInt( this.state.km_115_before_p_cm_fc ),
      km_115_before_a_cm_fc : this.valToInt( this.state.km_115_before_a_cm_fc ),
      km_115_tran_l_cm_fc : this.valToInt( this.state.km_115_tran_l_cm_fc ),
      km_115_tran_p_cm_fc : this.valToInt( this.state.km_115_tran_p_cm_fc ),
      km_115_tran_a_cm_fc : this.valToInt( this.state.km_115_tran_a_cm_fc ),
      km_115_on_l_cm_fc : this.valToInt( this.state.km_115_on_l_cm_fc ),
      km_115_on_p_cm_fc : this.valToInt( this.state.km_115_on_p_cm_fc ),
      km_115_on_a_cm_fc : this.valToInt( this.state.km_115_on_a_cm_fc ),
      km_12_before_l_cc_fc : this.valToInt( this.state.km_12_before_l_cc_fc ),
      km_12_before_p_cc_fc : this.valToInt( this.state.km_12_before_p_cc_fc ),
      km_12_before_a_cc_fc : this.valToInt( this.state.km_12_before_a_cc_fc ),
      km_12_tran_l_cc_fc : this.valToInt( this.state.km_12_tran_l_cc_fc ),
      km_12_tran_p_cc_fc : this.valToInt( this.state.km_12_tran_p_cc_fc ),
      km_12_tran_a_cc_fc : this.valToInt( this.state.km_12_tran_a_cc_fc ),
      km_12_on_l_cc_fc : this.valToInt( this.state.km_12_on_l_cc_fc ),
      km_12_on_p_cc_fc : this.valToInt( this.state.km_12_on_p_cc_fc ),
      km_12_on_a_cc_fc : this.valToInt( this.state.km_12_on_a_cc_fc ),
      km_12_before_l_cm_fc : this.valToInt( this.state.km_12_before_l_cm_fc ),
      km_12_before_p_cm_fc : this.valToInt( this.state.km_12_before_p_cm_fc ),
      km_12_before_a_cm_fc : this.valToInt( this.state.km_12_before_a_cm_fc ),
      km_12_tran_l_cm_fc : this.valToInt( this.state.km_12_tran_l_cm_fc ),
      km_12_tran_p_cm_fc : this.valToInt( this.state.km_12_tran_p_cm_fc ),
      km_12_tran_a_cm_fc : this.valToInt( this.state.km_12_tran_a_cm_fc ),
      km_12_on_l_cm_fc : this.valToInt( this.state.km_12_on_l_cm_fc ),
      km_12_on_p_cm_fc : this.valToInt( this.state.km_12_on_p_cm_fc ),
      km_12_on_a_cm_fc : this.valToInt( this.state.km_12_on_a_cm_fc ),
      km_125_before_l_cc_fc : this.valToInt( this.state.km_125_before_l_cc_fc ),
      km_125_before_p_cc_fc : this.valToInt( this.state.km_125_before_p_cc_fc ),
      km_125_before_a_cc_fc : this.valToInt( this.state.km_125_before_a_cc_fc ),
      km_125_tran_l_cc_fc : this.valToInt( this.state.km_125_tran_l_cc_fc ),
      km_125_tran_p_cc_fc : this.valToInt( this.state.km_125_tran_p_cc_fc ),
      km_125_tran_a_cc_fc : this.valToInt( this.state.km_125_tran_a_cc_fc ),
      km_125_on_l_cc_fc : this.valToInt( this.state.km_125_on_l_cc_fc ),
      km_125_on_p_cc_fc : this.valToInt( this.state.km_125_on_p_cc_fc ),
      km_125_on_a_cc_fc : this.valToInt( this.state.km_125_on_a_cc_fc ),
      km_125_before_l_cm_fc : this.valToInt( this.state.km_125_before_l_cm_fc ),
      km_125_before_p_cm_fc : this.valToInt( this.state.km_125_before_p_cm_fc ),
      km_125_before_a_cm_fc : this.valToInt( this.state.km_125_before_a_cm_fc ),
      km_125_tran_l_cm_fc : this.valToInt( this.state.km_125_tran_l_cm_fc ),
      km_125_tran_p_cm_fc : this.valToInt( this.state.km_125_tran_p_cm_fc ),
      km_125_tran_a_cm_fc : this.valToInt( this.state.km_125_tran_a_cm_fc ),
      km_125_on_l_cm_fc : this.valToInt( this.state.km_125_on_l_cm_fc ),
      km_125_on_p_cm_fc : this.valToInt( this.state.km_125_on_p_cm_fc ),
      km_125_on_a_cm_fc : this.valToInt( this.state.km_125_on_a_cm_fc ),
      km_13_before_l_cc_fc : this.valToInt( this.state.km_13_before_l_cc_fc ),
      km_13_before_p_cc_fc : this.valToInt( this.state.km_13_before_p_cc_fc ),
      km_13_before_a_cc_fc : this.valToInt( this.state.km_13_before_a_cc_fc ),
      km_13_tran_l_cc_fc : this.valToInt( this.state.km_13_tran_l_cc_fc ),
      km_13_tran_p_cc_fc : this.valToInt( this.state.km_13_tran_p_cc_fc ),
      km_13_tran_a_cc_fc : this.valToInt( this.state.km_13_tran_a_cc_fc ),
      km_13_on_l_cc_fc : this.valToInt( this.state.km_13_on_l_cc_fc ),
      km_13_on_p_cc_fc : this.valToInt( this.state.km_13_on_p_cc_fc ),
      km_13_on_a_cc_fc : this.valToInt( this.state.km_13_on_a_cc_fc ),
      km_13_before_l_cm_fc : this.valToInt( this.state.km_13_before_l_cm_fc ),
      km_13_before_p_cm_fc : this.valToInt( this.state.km_13_before_p_cm_fc ),
      km_13_before_a_cm_fc : this.valToInt( this.state.km_13_before_a_cm_fc ),
      km_13_tran_l_cm_fc : this.valToInt( this.state.km_13_tran_l_cm_fc ),
      km_13_tran_p_cm_fc : this.valToInt( this.state.km_13_tran_p_cm_fc ),
      km_13_tran_a_cm_fc : this.valToInt( this.state.km_13_tran_a_cm_fc ),
      km_13_on_l_cm_fc : this.valToInt( this.state.km_13_on_l_cm_fc ),
      km_13_on_p_cm_fc : this.valToInt( this.state.km_13_on_p_cm_fc ),
      km_13_on_a_cm_fc : this.valToInt( this.state.km_13_on_a_cm_fc ),
      km_135_before_l_cc_fc : this.valToInt( this.state.km_135_before_l_cc_fc ),
      km_135_before_p_cc_fc : this.valToInt( this.state.km_135_before_p_cc_fc ),
      km_135_before_a_cc_fc : this.valToInt( this.state.km_135_before_a_cc_fc ),
      km_135_tran_l_cc_fc : this.valToInt( this.state.km_135_tran_l_cc_fc ),
      km_135_tran_p_cc_fc : this.valToInt( this.state.km_135_tran_p_cc_fc ),
      km_135_tran_a_cc_fc : this.valToInt( this.state.km_135_tran_a_cc_fc ),
      km_135_on_l_cc_fc : this.valToInt( this.state.km_135_on_l_cc_fc ),
      km_135_on_p_cc_fc : this.valToInt( this.state.km_135_on_p_cc_fc ),
      km_135_on_a_cc_fc : this.valToInt( this.state.km_135_on_a_cc_fc ),
      km_135_before_l_cm_fc : this.valToInt( this.state.km_135_before_l_cm_fc ),
      km_135_before_p_cm_fc : this.valToInt( this.state.km_135_before_p_cm_fc ),
      km_135_before_a_cm_fc : this.valToInt( this.state.km_135_before_a_cm_fc ),
      km_135_tran_l_cm_fc : this.valToInt( this.state.km_135_tran_l_cm_fc ),
      km_135_tran_p_cm_fc : this.valToInt( this.state.km_135_tran_p_cm_fc ),
      km_135_tran_a_cm_fc : this.valToInt( this.state.km_135_tran_a_cm_fc ),
      km_135_on_l_cm_fc : this.valToInt( this.state.km_135_on_l_cm_fc ),
      km_135_on_p_cm_fc : this.valToInt( this.state.km_135_on_p_cm_fc ),
      km_135_on_a_cm_fc : this.valToInt( this.state.km_135_on_a_cm_fc ),
      km_14_before_l_cc_fc : this.valToInt( this.state.km_14_before_l_cc_fc ),
      km_14_before_p_cc_fc : this.valToInt( this.state.km_14_before_p_cc_fc ),
      km_14_before_a_cc_fc : this.valToInt( this.state.km_14_before_a_cc_fc ),
      km_14_tran_l_cc_fc : this.valToInt( this.state.km_14_tran_l_cc_fc ),
      km_14_tran_p_cc_fc : this.valToInt( this.state.km_14_tran_p_cc_fc ),
      km_14_tran_a_cc_fc : this.valToInt( this.state.km_14_tran_a_cc_fc ),
      km_14_on_l_cc_fc : this.valToInt( this.state.km_14_on_l_cc_fc ),
      km_14_on_p_cc_fc : this.valToInt( this.state.km_14_on_p_cc_fc ),
      km_14_on_a_cc_fc : this.valToInt( this.state.km_14_on_a_cc_fc ),
      km_14_before_l_cm_fc : this.valToInt( this.state.km_14_before_l_cm_fc ),
      km_14_before_p_cm_fc : this.valToInt( this.state.km_14_before_p_cm_fc ),
      km_14_before_a_cm_fc : this.valToInt( this.state.km_14_before_a_cm_fc ),
      km_14_tran_l_cm_fc : this.valToInt( this.state.km_14_tran_l_cm_fc ),
      km_14_tran_p_cm_fc : this.valToInt( this.state.km_14_tran_p_cm_fc ),
      km_14_tran_a_cm_fc : this.valToInt( this.state.km_14_tran_a_cm_fc ),
      km_14_on_l_cm_fc : this.valToInt( this.state.km_14_on_l_cm_fc ),
      km_14_on_p_cm_fc : this.valToInt( this.state.km_14_on_p_cm_fc ),
      km_14_on_a_cm_fc : this.valToInt( this.state.km_14_on_a_cm_fc )
    };

    console.log("Sending data: \n" + JSON.stringify( data ));

    axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/survey/big/insert',
                data, { headers: {'Content-Type': 'application/json'} })
    .then(res => {
      console.log(data)
      console.log("Successfully posted!")
      // alert('Midreach Survey Recorded.')
      this.setState({redirect:true})

    })
    .catch(error => {
      console.log(error.response)
      console.log("Error.")
    });
  }

  onChange = (e) => {

    // If in nests or false crawls table, update the sums
    // this.inputField.current.value = 9999;
    // console.log("e.target.data-rownum = " + e.target.getAttribute("data-rownum"));

    if (e.target.getAttribute("data-table") === "nests") {
      let rowNum = parseInt( e.target.getAttribute("data-rownum") );
      let colNum = parseInt( e.target.getAttribute("data-colnum") );
      if (isNaN(rowNum) || isNaN(colNum)) {
        return;
      }

      let diff = this.getDiff(this.state[e.target.name], e.target.value);

      // // Find the column and add the diff to it.
      let currentRowSum = parseInt(this.nest_rowSumArr[rowNum].current.value);
      if (isNaN(currentRowSum)) {
        currentRowSum = 0;
      }

      if (rowNum % 2 == 0) { // Even number = Cc column sum
        let currentColSum = parseInt(this.nest_CCcolSumArr[colNum].current.value);
        if (isNaN(currentColSum)) {
          currentColSum = 0;
        }
        this.nest_rowSumArr[rowNum].current.value = currentRowSum + diff;
        this.nest_CCcolSumArr[colNum].current.value = currentColSum + diff;

        // Update sums
        let currentBigSum = parseInt(this.nest_CCcolSumArr[3].current.value);
        if (isNaN(currentBigSum)) {
          currentBigSum = 0;
        }
        this.nest_CCcolSumArr[3].current.value = currentBigSum + diff;
      }
      else { // Even number = Cm column sum
        let currentColSum = parseInt(this.nest_CMcolSumArr[colNum].current.value);
        if (isNaN(currentColSum)) {
          currentColSum = 0;
        }
        this.nest_rowSumArr[rowNum].current.value = currentRowSum + diff;
        this.nest_CMcolSumArr[colNum].current.value = currentColSum + diff;

        // Update sums
        let currentBigSum = parseInt(this.nest_CMcolSumArr[3].current.value);
        if (isNaN(currentBigSum)) {
          currentBigSum = 0;
        }
        this.nest_CMcolSumArr[3].current.value = currentBigSum + diff;
      }
    }

    else if (e.target.getAttribute("data-table") === "falseCrawls") {
      let rowNum = parseInt( e.target.getAttribute("data-rownum") );
      let colNum = parseInt( e.target.getAttribute("data-colnum") );
      if (isNaN(rowNum) || isNaN(colNum)) {
        return;
      }

      let diff = this.getDiff(this.state[e.target.name], e.target.value);

      // // Find the column and add the diff to it.
      let currentRowSum = parseInt(this.falseCrawls_rowSumArr[rowNum].current.value);
      if (isNaN(currentRowSum)) {
        currentRowSum = 0;
      }

      if (rowNum % 2 == 0) { // Even number = Cc column sum
        let currentColSum = parseInt(this.falseCrawls_CCcolSumArr[colNum].current.value);
        if (isNaN(currentColSum)) {
          currentColSum = 0;
        }
        this.falseCrawls_rowSumArr[rowNum].current.value = currentRowSum + diff;
        this.falseCrawls_CCcolSumArr[colNum].current.value = currentColSum + diff;

        // Update sums
        let currentBigSum = parseInt(this.falseCrawls_CCcolSumArr[9].current.value);
        if (isNaN(currentBigSum)) {
          currentBigSum = 0;
        }
        this.falseCrawls_CCcolSumArr[9].current.value = currentBigSum + diff;
      }
      else { // Even number = Cm column sum
        let currentColSum = parseInt(this.falseCrawls_CMcolSumArr[colNum].current.value);
        if (isNaN(currentColSum)) {
          currentColSum = 0;
        }
        this.falseCrawls_rowSumArr[rowNum].current.value = currentRowSum + diff;
        this.falseCrawls_CMcolSumArr[colNum].current.value = currentColSum + diff;

        // Update sums
        let currentBigSum = parseInt(this.falseCrawls_CMcolSumArr[9].current.value);
        if (isNaN(currentBigSum)) {
          currentBigSum = 0;
        }
        this.falseCrawls_CMcolSumArr[9].current.value = currentBigSum + diff;
      }
    }

    this.setState({ [e.target.name]: e.target.value })
  }

  getDiff (prev, current) {
    let prevValue = parseInt(prev);
    let currentValue = parseInt(current);
    if (isNaN(prevValue)) {
      prevValue = 0;
    }
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    let diff = currentValue - prevValue;
    return diff;
  }

  // RENDER HELPERS

  // Returns a list of HTML turtle rows, for use in the data table.
  getNests_tableRows (m_key, startKm, endKm) {
    let key = m_key.key;
    let tableRows = [];

    let n = inputNamesArr_nestsStart;

    // Fill out rows
    let rowNum = 0;
    for (let i = startKm; i < endKm; i += 0.5) {
      if (n > inputNamesArr_falseCrawlsStart) {
        console.error("n = " + n + " is greater than inputNamesArr_falseCrawlsStart = " + inputNamesArr_falseCrawlsStart);
      }

      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="center-td">Cc</td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="0" data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="1" data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="2" data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="grey-td">
                             <input ref={this.nest_rowSumArr[rowNum++]} className="form-control" type="number" id="example-text-input" disabled/></td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="center-td">Cm</td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="0" data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="1" data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="2"data-table="nests" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="grey-td">
                             <input ref={this.nest_rowSumArr[rowNum++]} className="form-control" type="number" id="example-text-input" disabled/> </td>
          </tr>
        </>
      );
    }

    // Total rows
    tableRows.push (
      <>
        <tr key={key++} className="bold-top-border">
          <td colSpan="2" className="grey-td center-td" key={key++}><b>Cc Totals</b></td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CCcolSumArr[0]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CCcolSumArr[1]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.nest_CCcolSumArr[2]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CCcolSumArr[3]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td" key={key++}><b>Cm Totals</b></td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CMcolSumArr[0]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CMcolSumArr[1]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.nest_CMcolSumArr[2]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.nest_CMcolSumArr[3]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
        </tr>
      </>
    );

    m_key.key = key;
    return tableRows;
  }

  getFalseCrawls_tableRows (m_key, startKm, endKm) {
    let key = m_key.key;
    let tableRows = [];

    let n = inputNamesArr_falseCrawlsStart;

    // Fill out rows
    let rowNum = 0;
    for (let i = startKm; i < endKm; i += 0.5) {
      if (n >= inputNamesArr.length) {
        console.error("n = " + n + " is greater than or equal to inputNamesArr.length = " + inputNamesArr.length);
      }

      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="bold-right-border center-td">Cc</td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="0" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="1" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="2" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++}> <input data-rownum={rowNum} data-colnum="3" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="4" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="5" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++}> <input data-rownum={rowNum} data-colnum="6" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="7" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="8" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++} className="grey-td">
                             <input ref={this.falseCrawls_rowSumArr[rowNum++]} className="form-control" type="number" id="example-text-input" disabled/> </td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="bold-right-border center-td">Cm</td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="0" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="1" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="2" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++}> <input data-rownum={rowNum} data-colnum="3" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="4" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="5" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++}> <input data-rownum={rowNum} data-colnum="6" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++}> <input data-rownum={rowNum} data-colnum="7" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>
            <td key={key++} className="bold-right-border">
                             <input data-rownum={rowNum} data-colnum="8" data-table="falseCrawls" className="form-control" type="number" name={ inputNamesArr[n++] } /> </td>

            <td key={key++} className="grey-td">
                             <input ref={this.falseCrawls_rowSumArr[rowNum++]} className="form-control" type="number" id="example-text-input" disabled/> </td>
          </tr>
        </>
      );
    }

    // Total rows
    tableRows.push (
      <>
        <tr key={key++} className="bold-top-border">
          <td colSpan="2" className="grey-td center-td bold-right-border" key={key++}>
            <b>Cc Totals</b>
          </td>

          {/* Before */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[0]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[1]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[2]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[3]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[4]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[5]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[6]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[7]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CCcolSumArr[8]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input ref={this.falseCrawls_CCcolSumArr[9]} className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td bold-right-border" key={key++}>
            <b>Cm Totals</b>
          </td>

          {/* Before */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[0]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[1]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[2]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[3]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[4]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[5]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[6]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[7]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input ref={this.falseCrawls_CMcolSumArr[8]} className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input ref={this.falseCrawls_CMcolSumArr[9]} className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
      </>
    );

    m_key.key = key;
    return tableRows;
  }

  getEmergences_tableRows (m_key) {
    let key = m_key.key;
    let tableRows = [];

    tableRows.push (
      <>
        <tr>
          <td> <input className="form-control" type="text" name="stake_num_1" /> </td>
          <td> <input className="form-control" type="text" name="stake_num_2" /> </td>
        </tr>
        <tr>
          <td> <input className="form-control" type="text" name="stake_num_3" /> </td>
          <td> <input className="form-control" type="text" name="stake_num_4" /> </td>
        </tr>
      </>
    )

    // Fill out rows
    // for (let i = 0; i < 2; i++) {
    //   tableRows.push (
    //     <>
    //       <tr>
    //         <td> <input className="form-control" type="text" id="example-text-input" /> </td>
    //         <td> <input className="form-control" type="text" id="example-text-input" /> </td>
    //       </tr>
    //     </>
    //   );
    // }

    m_key.key = key;
    return tableRows;
  }

  render() {
    let nests_tableRows = [];
    let falseCrawls_tableRows = [];
    let emergences_tableRows = [];

    let m_key = {key:0};

    nests_tableRows = this.getNests_tableRows(m_key, this.state.startKm, this.state.endKm);
    falseCrawls_tableRows = this.getFalseCrawls_tableRows(m_key, this.state.startKm, this.state.endKm);
    emergences_tableRows = this.getEmergences_tableRows(m_key);

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid survey-container">
          <h1><b>PATRICK AFB SURVEY SHEET</b></h1><br></br>
          <hr />
          <div className="pb-4"></div>

          <form onSubmit={this.handleSubmit} onChange={this.onChange}>
            <div className="form-row">
              {/* Date */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Date</label>
                  <div className="col-9">
                    <input className="form-control" type="date" name="date" />
                  </div>
                </div>
              </div>
              {/* Initials */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Initials</label>
                  <div className="col-9">
                    <input className="form-control" type="text" name="initials" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row pt-5">
              {/* NESTS */}
              <div className="col-md-4 pr-3">
                <div className="survey-section-div">
                  <h3><b>Nests</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr><th colSpan='6'>&nbsp;</th></tr>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th scope="col"></th>
                      <th scope="col">B</th>
                      <th scope="col">T</th>
                      <th scope="col" className="bold-right-border">O</th>
                      <th scope="col" className="grey-td">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    { nests_tableRows }
                  </tbody>
                </table>
              </div>

              {/* FALSE CRAWLS */}
              <div className="col-md">
                <div className="survey-section-div">
                  <h3><b>False crawls</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col"></th>
                      <th scope="col" className="bold-right-border"></th>
                      <th scope="col" colSpan='3' className="bold-right-border">Before</th>
                      <th scope="col" colSpan='3' className="bold-right-border">Transition</th>
                      <th scope="col" colSpan='3' className="bold-right-border">On Dune</th>
                      <th scope="col"></th>
                    </tr>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th scope="col" className="bold-right-border"></th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col" className="grey-td">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    { falseCrawls_tableRows }
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-row pt-5">

              {/* EMERGENCES */}
              <div className="col">
                <div className="survey-section-div">
                  <h3><b>Emergences</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th scope="col">Stake #</th>
                      <th scope="col">Stake #</th>
                    </tr>
                  </thead>
                  <tbody>
                    { emergences_tableRows }
                  </tbody>
                </table>
              </div>
              {/* BELOW HTL */}
              <div className="col-md-3">
                <div className="survey-section-div">
                  <h3><b>Below HTL</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col"></th>
                      <th scope="col">Nest</th>
                      <th style={{width:  '95px'}} scope="col">FC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cc</td>
                      <td> <input className="form-control" type="text" name="below_htl_cc_nest" /> </td>
                      <td> <input className="form-control" type="text" name="below_htl_cc_fc" /> </td>
                    </tr>
                    <tr>
                      <td>Cm</td>
                      <td> <input className="form-control" type="text" name="below_htl_cm_nest" /> </td>
                      <td> <input className="form-control" type="text" name="below_htl_cm_fc" /> </td>
                    </tr>
                    <tr>
                      <td>Dc</td>
                      <td> <input className="form-control" type="text" name="below_htl_dc_nest" /> </td>
                      <td> <input className="form-control" type="text" name="below_htl_dc_fc" /> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Notes */}
              <div className="col-md pl-4">
                <div className="form-group row">
                  <label className="pl-2 mb-0"><h3>Notes</h3></label>
                  <textarea className="ml-2" name="notes" rows="6" cols="80">
                  </textarea>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-5">SUBMIT</button>
          </form>
        </div>

        {this.renderRedirect()}

        <InternalFooter />
      </>
    );
  }
}



export default SurveyPAFB;
