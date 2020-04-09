import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";
import '../shared/internal.css';

const TITLE = 'Midreach Survey Sheet'

class SurveyMidreach extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      redirect: false,
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/new-report/' />
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

    /*
    const data = {
      type : "mid",
      date : this.state.date,
      initials : JB,
      notes : give a note box at the bottom of survey,
      emergences: [
      	{
      		stake_number_1: some stake again,
      		stake_number_2: another stake again
      	},
      	{
      		stake_number_1: hm if another pair,
      		stake_number_2: yup i guess
      	}
      ],
      below_htl_cc_nest : 1,
      below_htl_cc_fc : 2,
      below_htl_cm_nest : 3,
      below_htl_cm_fc : 4,
      below_htl_dc_nest : 5,
      below_htl_dc_fc : 6,
      km_25_45s_0_b_cc_nests : 1,
      km_25_45s_0_t_cc_nests : 2,
      km_25_45s_0_o_cc_nests : 3,
      km_25_45s_0_b_cm_nests : 4,
      km_25_45s_0_t_cm_nests : 5,
      km_25_45s_0_o_cm_nests : 6,
      km_3_4s_05_b_cc_nests : 7,
      km_3_4s_05_t_cc_nests : 8,
      km_3_4s_05_o_cc_nests : 9,
      km_3_4s_05_b_cm_nests : 10,
      km_3_4s_05_t_cm_nests : 11,
      km_3_4s_05_o_cm_nests : 12,
      km_35_35s_1_b_cc_nests : 13,
      km_35_35s_1_t_cc_nests : 14,
      km_35_35s_1_o_cc_nests : 15,
      km_35_35s_1_b_cm_nests : 16,
      km_35_35s_1_t_cm_nests : 17,
      km_35_35s_1_o_cm_nests : 18,
      km_4_3s_15_b_cc_nests : 19,
      km_4_3s_15_t_cc_nests : 20,
      km_4_3s_15_o_cc_nests : 21,
      km_4_3s_15_b_cm_nests : 22,
      km_4_3s_15_t_cm_nests : 23,
      km_4_3s_15_o_cm_nests : 24,
      km_45_25s_2_b_cc_nests : 25,
      km_45_25s_2_t_cc_nests : 26,
      km_45_25s_2_o_cc_nests : 27,
      km_45_25s_2_b_cm_nests : 28,
      km_45_25s_2_t_cm_nests : 29,
      km_45_25s_2_o_cm_nests : 30,
      km_5_2s_25_b_cc_nests : 31,
      km_5_2s_25_t_cc_nests : 32,
      km_5_2s_25_o_cc_nests : 33,
      km_5_2s_25_b_cm_nests : 34,
      km_5_2s_25_t_cm_nests : 35,
      km_5_2s_25_o_cm_nests : 36,
      km_55_15s_3_b_cc_nests : 37,
      km_55_15s_3_t_cc_nests : 38,
      km_55_15s_3_o_cc_nests : 39,
      km_55_15s_3_b_cm_nests : 40,
      km_55_15s_3_t_cm_nests : 41,
      km_55_15s_3_o_cm_nests : 42,
      km_6_1s_35_b_cc_nests : 43,
      km_6_1s_35_t_cc_nests : 44,
      km_6_1s_35_o_cc_nests : 45,
      km_6_1s_35_b_cm_nests : 46,
      km_6_1s_35_t_cm_nests : 47,
      km_6_1s_35_o_cm_nests : 48,
      km_65_05s_4_b_cc_nests : 49,
      km_65_05s_4_t_cc_nests : 50,
      km_65_05s_4_o_cc_nests : 51,
      km_65_05s_4_b_cm_nests : 52,
      km_65_05s_4_t_cm_nests : 53,
      km_65_05s_4_o_cm_nests : 54,
      km_7_0s_45_b_cc_nests : 55,
      km_7_0s_45_t_cc_nests : 56,
      km_7_0s_45_o_cc_nests : 57,
      km_7_0s_45_b_cm_nests : 58,
      km_7_0s_45_t_cm_nests : 59,
      km_7_0s_45_o_cm_nests : 60,
      km_75_0n_5_b_cc_nests : 61,
      km_75_0n_5_t_cc_nests : 62,
      km_75_0n_5_o_cc_nests : 63,
      km_75_0n_5_b_cm_nests : 64,
      km_75_0n_5_t_cm_nests : 65,
      km_75_0n_5_o_cm_nests : 66,
      km_8_05n_55_b_cc_nests : 67,
      km_8_05n_55_t_cc_nests : 68,
      km_8_05n_55_o_cc_nests : 69,
      km_8_05n_55_b_cm_nests : 70,
      km_8_05n_55_t_cm_nests : 71,
      km_8_05n_55_o_cm_nests : 72,
      km_85_1n_6_b_cc_nests : 73,
      km_85_1n_6_t_cc_nests : 74,
      km_85_1n_6_o_cc_nests : 75,
      km_85_1n_6_b_cm_nests : 76,
      km_85_1n_6_t_cm_nests : 77,
      km_85_1n_6_o_cm_nests : 78,
      km_9_15n_65_b_cc_nests : 79,
      km_9_15n_65_t_cc_nests : 80,
      km_9_15n_65_o_cc_nests : 81,
      km_9_15n_65_b_cm_nests : 82,
      km_9_15n_65_t_cm_nests : 83,
      km_9_15n_65_o_cm_nests : 84,
      km_95_2n_b_cc_nests : 85,
      km_95_2n_t_cc_nests : 86,
      km_95_2n_o_cc_nests : 87,
      km_95_2n_b_cm_nests : 88,
      km_95_2n_t_cm_nests : 89,
      km_95_2n_o_cm_nests : 90,
      km_10_b_cc_nests : 91,
      km_10_t_cc_nests : 92,
      km_10_o_cc_nests : 93,
      km_10_b_cm_nests : 94,
      km_10_t_cm_nests : 95,
      km_10_o_cm_nests : 96,
      km_105_b_cc_nests : 97,
      km_105_t_cc_nests : 98,
      km_105_o_cc_nests : 99,
      km_105_b_cm_nests : 100,
      km_105_t_cm_nests : 101,
      km_105_o_cm_nests : 102,
      km_11_b_cc_nests : 103,
      km_11_t_cc_nests : 104,
      km_11_o_cc_nests : 105,
      km_11_b_cm_nests : 106,
      km_11_t_cm_nests : 107,
      km_11_o_cm_nests : 108,
      km_115_b_cc_nests : 109,
      km_115_t_cc_nests : 110,
      km_115_o_cc_nests : 111,
      km_115_b_cm_nests : 112,
      km_115_t_cm_nests : 113,
      km_115_o_cm_nests : 114,
      km_12_b_cc_nests : 115,
      km_12_t_cc_nests : 116,
      km_12_o_cc_nests : 117,
      km_12_b_cm_nests : 118,
      km_12_t_cm_nests : 119,
      km_12_o_cm_nests : 120,
      km_125_b_cc_nests : 121,
      km_125_t_cc_nests : 122,
      km_125_o_cc_nests : 123,
      km_125_b_cm_nests : 124,
      km_125_t_cm_nests : 125,
      km_125_o_cm_nests : 126,
      km_13_b_cc_nests : 127,
      km_13_t_cc_nests : 128,
      km_13_o_cc_nests : 129,
      km_13_b_cm_nests : 130,
      km_13_t_cm_nests : 131,
      km_13_o_cm_nests : 132,
      km_135_b_cc_nests : 133,
      km_135_t_cc_nests : 134,
      km_135_o_cc_nests : 135,
      km_135_b_cm_nests : 136,
      km_135_t_cm_nests : 137,
      km_135_o_cm_nests : 138,
      km_14_b_cc_nests : 139,
      km_14_t_cc_nests : 140,
      km_14_o_cc_nests : 141,
      km_14_b_cm_nests : 142,
      km_14_t_cm_nests : 143,
      km_14_o_cm_nests : 144,
      km_25_45s_0_before_l_cc_fc : 1,
      km_25_45s_0_before_p_cc_fc : 2,
      km_25_45s_0_before_a_cc_fc : 3,
      km_25_45s_0_tran_l_cc_fc : 4,
      km_25_45s_0_tran_p_cc_fc : 5,
      km_25_45s_0_tran_a_cc_fc : 6,
      km_25_45s_0_on_l_cc_fc : 7,
      km_25_45s_0_on_p_cc_fc : 8,
      km_25_45s_0_on_a_cc_fc : 9,
      km_25_45s_0_before_l_cm_fc : 10,
      km_25_45s_0_before_p_cm_fc : 11,
      km_25_45s_0_before_a_cm_fc : 12,
      km_25_45s_0_tran_l_cm_fc : 13,
      km_25_45s_0_tran_p_cm_fc : 14,
      km_25_45s_0_tran_a_cm_fc : 15,
      km_25_45s_0_on_l_cm_fc : 16,
      km_25_45s_0_on_p_cm_fc : 17,
      km_25_45s_0_on_a_cm_fc : 18,
      km_3_4s_05_before_l_cc_fc : 19,
      km_3_4s_05_before_p_cc_fc : 20,
      km_3_4s_05_before_a_cc_fc : 21,
      km_3_4s_05_tran_l_cc_fc : 22,
      km_3_4s_05_tran_p_cc_fc : 23,
      km_3_4s_05_tran_a_cc_fc : 24,
      km_3_4s_05_on_l_cc_fc : 25,
      km_3_4s_05_on_p_cc_fc : 26,
      km_3_4s_05_on_a_cc_fc : 27,
      km_3_4s_05_before_l_cm_fc : 28,
      km_3_4s_05_before_p_cm_fc : 29,
      km_3_4s_05_before_a_cm_fc : 30,
      km_3_4s_05_tran_l_cm_fc : 31,
      km_3_4s_05_tran_p_cm_fc : 32,
      km_3_4s_05_tran_a_cm_fc : 33,
      km_3_4s_05_on_l_cm_fc : 34,
      km_3_4s_05_on_p_cm_fc : 35,
      km_3_4s_05_on_a_cm_fc : 36,
      km_35_35s_1_before_l_cc_fc : 37,
      km_35_35s_1_before_p_cc_fc : 38,
      km_35_35s_1_before_a_cc_fc : 39,
      km_35_35s_1_tran_l_cc_fc : 40,
      km_35_35s_1_tran_p_cc_fc : 41,
      km_35_35s_1_tran_a_cc_fc : 42,
      km_35_35s_1_on_l_cc_fc : 43,
      km_35_35s_1_on_p_cc_fc : 44,
      km_35_35s_1_on_a_cc_fc : 45,
      km_35_35s_1_before_l_cm_fc : 46,
      km_35_35s_1_before_p_cm_fc : 47,
      km_35_35s_1_before_a_cm_fc : 48,
      km_35_35s_1_tran_l_cm_fc : 49,
      km_35_35s_1_tran_p_cm_fc : 50,
      km_35_35s_1_tran_a_cm_fc : 51,
      km_35_35s_1_on_l_cm_fc : 52,
      km_35_35s_1_on_p_cm_fc : 53,
      km_35_35s_1_on_a_cm_fc : 54,
      km_4_3s_15_before_l_cc_fc : 55,
      km_4_3s_15_before_p_cc_fc : 56,
      km_4_3s_15_before_a_cc_fc : 57,
      km_4_3s_15_tran_l_cc_fc : 58,
      km_4_3s_15_tran_p_cc_fc : 59,
      km_4_3s_15_tran_a_cc_fc : 60,
      km_4_3s_15_on_l_cc_fc : 61,
      km_4_3s_15_on_p_cc_fc : 62,
      km_4_3s_15_on_a_cc_fc : 63,
      km_4_3s_15_before_l_cm_fc : 64,
      km_4_3s_15_before_p_cm_fc : 65,
      km_4_3s_15_before_a_cm_fc : 66,
      km_4_3s_15_tran_l_cm_fc : 67,
      km_4_3s_15_tran_p_cm_fc : 68,
      km_4_3s_15_tran_a_cm_fc : 69,
      km_4_3s_15_on_l_cm_fc : 70,
      km_4_3s_15_on_p_cm_fc : 71,
      km_4_3s_15_on_a_cm_fc : 72,
      km_45_25s_2_before_l_cc_fc : 73,
      km_45_25s_2_before_p_cc_fc : 74,
      km_45_25s_2_before_a_cc_fc : 75,
      km_45_25s_2_tran_l_cc_fc : 76,
      km_45_25s_2_tran_p_cc_fc : 77,
      km_45_25s_2_tran_a_cc_fc : 78,
      km_45_25s_2_on_l_cc_fc : 79,
      km_45_25s_2_on_p_cc_fc : 80,
      km_45_25s_2_on_a_cc_fc : 81,
      km_45_25s_2_before_l_cm_fc : 82,
      km_45_25s_2_before_p_cm_fc : 83,
      km_45_25s_2_before_a_cm_fc : 84,
      km_45_25s_2_tran_l_cm_fc : 85,
      km_45_25s_2_tran_p_cm_fc : 86,
      km_45_25s_2_tran_a_cm_fc : 87,
      km_45_25s_2_on_l_cm_fc : 88,
      km_45_25s_2_on_p_cm_fc : 89,
      km_45_25s_2_on_a_cm_fc : 90,
      km_5_2s_25_before_l_cc_fc : 91,
      km_5_2s_25_before_p_cc_fc : 92,
      km_5_2s_25_before_a_cc_fc : 93,
      km_5_2s_25_tran_l_cc_fc : 94,
      km_5_2s_25_tran_p_cc_fc : 95,
      km_5_2s_25_tran_a_cc_fc : 96,
      km_5_2s_25_on_l_cc_fc : 97,
      km_5_2s_25_on_p_cc_fc : 98,
      km_5_2s_25_on_a_cc_fc : 99,
      km_5_2s_25_before_l_cm_fc : 100,
      km_5_2s_25_before_p_cm_fc : 101,
      km_5_2s_25_before_a_cm_fc : 102,
      km_5_2s_25_tran_l_cm_fc : 103,
      km_5_2s_25_tran_p_cm_fc : 104,
      km_5_2s_25_tran_a_cm_fc : 105,
      km_5_2s_25_on_l_cm_fc : 106,
      km_5_2s_25_on_p_cm_fc : 107,
      km_5_2s_25_on_a_cm_fc : 108,
      km_55_15s_3_before_l_cc_fc : 109,
      km_55_15s_3_before_p_cc_fc : 110,
      km_55_15s_3_before_a_cc_fc : 111,
      km_55_15s_3_tran_l_cc_fc : 112,
      km_55_15s_3_tran_p_cc_fc : 113,
      km_55_15s_3_tran_a_cc_fc : 114,
      km_55_15s_3_on_l_cc_fc : 115,
      km_55_15s_3_on_p_cc_fc : 116,
      km_55_15s_3_on_a_cc_fc : 117,
      km_55_15s_3_before_l_cm_fc : 118,
      km_55_15s_3_before_p_cm_fc : 119,
      km_55_15s_3_before_a_cm_fc : 120,
      km_55_15s_3_tran_l_cm_fc : 121,
      km_55_15s_3_tran_p_cm_fc : 122,
      km_55_15s_3_tran_a_cm_fc : 123,
      km_55_15s_3_on_l_cm_fc : 124,
      km_55_15s_3_on_p_cm_fc : 125,
      km_55_15s_3_on_a_cm_fc : 126,
      km_6_1s_35_before_l_cc_fc : 127,
      km_6_1s_35_before_p_cc_fc : 128,
      km_6_1s_35_before_a_cc_fc : 129,
      km_6_1s_35_tran_l_cc_fc : 130,
      km_6_1s_35_tran_p_cc_fc : 131,
      km_6_1s_35_tran_a_cc_fc : 132,
      km_6_1s_35_on_l_cc_fc : 133,
      km_6_1s_35_on_p_cc_fc : 134,
      km_6_1s_35_on_a_cc_fc : 135,
      km_6_1s_35_before_l_cm_fc : 136,
      km_6_1s_35_before_p_cm_fc : 137,
      km_6_1s_35_before_a_cm_fc : 138,
      km_6_1s_35_tran_l_cm_fc : 139,
      km_6_1s_35_tran_p_cm_fc : 140,
      km_6_1s_35_tran_a_cm_fc : 141,
      km_6_1s_35_on_l_cm_fc : 142,
      km_6_1s_35_on_p_cm_fc : 143,
      km_6_1s_35_on_a_cm_fc : 144,
      km_65_05s_4_before_l_cc_fc : 145,
      km_65_05s_4_before_p_cc_fc : 146,
      km_65_05s_4_before_a_cc_fc : 147,
      km_65_05s_4_tran_l_cc_fc : 148,
      km_65_05s_4_tran_p_cc_fc : 149,
      km_65_05s_4_tran_a_cc_fc : 150,
      km_65_05s_4_on_l_cc_fc : 151,
      km_65_05s_4_on_p_cc_fc : 152,
      km_65_05s_4_on_a_cc_fc : 153,
      km_65_05s_4_before_l_cm_fc : 154,
      km_65_05s_4_before_p_cm_fc : 155,
      km_65_05s_4_before_a_cm_fc : 156,
      km_65_05s_4_tran_l_cm_fc : 157,
      km_65_05s_4_tran_p_cm_fc : 158,
      km_65_05s_4_tran_a_cm_fc : 159,
      km_65_05s_4_on_l_cm_fc : 160,
      km_65_05s_4_on_p_cm_fc : 161,
      km_65_05s_4_on_a_cm_fc : 162,
      km_7_0s_45_before_l_cc_fc : 163,
      km_7_0s_45_before_p_cc_fc : 164,
      km_7_0s_45_before_a_cc_fc : 165,
      km_7_0s_45_tran_l_cc_fc : 166,
      km_7_0s_45_tran_p_cc_fc : 167,
      km_7_0s_45_tran_a_cc_fc : 168,
      km_7_0s_45_on_l_cc_fc : 169,
      km_7_0s_45_on_p_cc_fc : 170,
      km_7_0s_45_on_a_cc_fc : 171,
      km_7_0s_45_before_l_cm_fc : 172,
      km_7_0s_45_before_p_cm_fc : 173,
      km_7_0s_45_before_a_cm_fc : 174,
      km_7_0s_45_tran_l_cm_fc : 175,
      km_7_0s_45_tran_p_cm_fc : 176,
      km_7_0s_45_tran_a_cm_fc : 177,
      km_7_0s_45_on_l_cm_fc : 178,
      km_7_0s_45_on_p_cm_fc : 179,
      km_7_0s_45_on_a_cm_fc : 180,
      km_75_0n_5_before_l_cc_fc : 181,
      km_75_0n_5_before_p_cc_fc : 182,
      km_75_0n_5_before_a_cc_fc : 183,
      km_75_0n_5_tran_l_cc_fc : 184,
      km_75_0n_5_tran_p_cc_fc : 185,
      km_75_0n_5_tran_a_cc_fc : 186,
      km_75_0n_5_on_l_cc_fc : 187,
      km_75_0n_5_on_p_cc_fc : 188,
      km_75_0n_5_on_a_cc_fc : 189,
      km_75_0n_5_before_l_cm_fc : 190,
      km_75_0n_5_before_p_cm_fc : 191,
      km_75_0n_5_before_a_cm_fc : 192,
      km_75_0n_5_tran_l_cm_fc : 193,
      km_75_0n_5_tran_p_cm_fc : 194,
      km_75_0n_5_tran_a_cm_fc : 195,
      km_75_0n_5_on_l_cm_fc : 196,
      km_75_0n_5_on_p_cm_fc : 197,
      km_75_0n_5_on_a_cm_fc : 198,
      km_8_05n_55_before_l_cc_fc : 199,
      km_8_05n_55_before_p_cc_fc : 200,
      km_8_05n_55_before_a_cc_fc : 201,
      km_8_05n_55_tran_l_cc_fc : 202,
      km_8_05n_55_tran_p_cc_fc : 203,
      km_8_05n_55_tran_a_cc_fc : 204,
      km_8_05n_55_on_l_cc_fc : 205,
      km_8_05n_55_on_p_cc_fc : 206,
      km_8_05n_55_on_a_cc_fc : 207,
      km_8_05n_55_before_l_cm_fc : 208,
      km_8_05n_55_before_p_cm_fc : 209,
      km_8_05n_55_before_a_cm_fc : 210,
      km_8_05n_55_tran_l_cm_fc : 211,
      km_8_05n_55_tran_p_cm_fc : 212,
      km_8_05n_55_tran_a_cm_fc : 213,
      km_8_05n_55_on_l_cm_fc : 214,
      km_8_05n_55_on_p_cm_fc : 215,
      km_8_05n_55_on_a_cm_fc : 216,
      km_85_1n_6_before_l_cc_fc : 217,
      km_85_1n_6_before_p_cc_fc : 218,
      km_85_1n_6_before_a_cc_fc : 219,
      km_85_1n_6_tran_l_cc_fc : 220,
      km_85_1n_6_tran_p_cc_fc : 221,
      km_85_1n_6_tran_a_cc_fc : 222,
      km_85_1n_6_on_l_cc_fc : 223,
      km_85_1n_6_on_p_cc_fc : 224,
      km_85_1n_6_on_a_cc_fc : 225,
      km_85_1n_6_before_l_cm_fc : 226,
      km_85_1n_6_before_p_cm_fc : 227,
      km_85_1n_6_before_a_cm_fc : 228,
      km_85_1n_6_tran_l_cm_fc : 229,
      km_85_1n_6_tran_p_cm_fc : 230,
      km_85_1n_6_tran_a_cm_fc : 231,
      km_85_1n_6_on_l_cm_fc : 232,
      km_85_1n_6_on_p_cm_fc : 233,
      km_85_1n_6_on_a_cm_fc : 234,
      km_9_15n_65_before_l_cc_fc : 235,
      km_9_15n_65_before_p_cc_fc : 236,
      km_9_15n_65_before_a_cc_fc : 237,
      km_9_15n_65_tran_l_cc_fc : 238,
      km_9_15n_65_tran_p_cc_fc : 239,
      km_9_15n_65_tran_a_cc_fc : 240,
      km_9_15n_65_on_l_cc_fc : 241,
      km_9_15n_65_on_p_cc_fc : 242,
      km_9_15n_65_on_a_cc_fc : 243,
      km_9_15n_65_before_l_cm_fc : 244,
      km_9_15n_65_before_p_cm_fc : 245,
      km_9_15n_65_before_a_cm_fc : 246,
      km_9_15n_65_tran_l_cm_fc : 247,
      km_9_15n_65_tran_p_cm_fc : 248,
      km_9_15n_65_tran_a_cm_fc : 249,
      km_9_15n_65_on_l_cm_fc : 250,
      km_9_15n_65_on_p_cm_fc : 251,
      km_9_15n_65_on_a_cm_fc : 252,
      km_95_2n_before_l_cc_fc : 253,
      km_95_2n_before_p_cc_fc : 254,
      km_95_2n_before_a_cc_fc : 255,
      km_95_2n_tran_l_cc_fc : 256,
      km_95_2n_tran_p_cc_fc : 257,
      km_95_2n_tran_a_cc_fc : 258,
      km_95_2n_on_l_cc_fc : 259,
      km_95_2n_on_p_cc_fc : 260,
      km_95_2n_on_a_cc_fc : 261,
      km_95_2n_before_l_cm_fc : 262,
      km_95_2n_before_p_cm_fc : 263,
      km_95_2n_before_a_cm_fc : 264,
      km_95_2n_tran_l_cm_fc : 265,
      km_95_2n_tran_p_cm_fc : 266,
      km_95_2n_tran_a_cm_fc : 267,
      km_95_2n_on_l_cm_fc : 268,
      km_95_2n_on_p_cm_fc : 269,
      km_95_2n_on_a_cm_fc : 270,
      km_10_before_l_cc_fc : 271,
      km_10_before_p_cc_fc : 272,
      km_10_before_a_cc_fc : 273,
      km_10_tran_l_cc_fc : 274,
      km_10_tran_p_cc_fc : 275,
      km_10_tran_a_cc_fc : 276,
      km_10_on_l_cc_fc : 277,
      km_10_on_p_cc_fc : 278,
      km_10_on_a_cc_fc : 279,
      km_10_before_l_cm_fc : 280,
      km_10_before_p_cm_fc : 281,
      km_10_before_a_cm_fc : 282,
      km_10_tran_l_cm_fc : 283,
      km_10_tran_p_cm_fc : 284,
      km_10_tran_a_cm_fc : 285,
      km_10_on_l_cm_fc : 286,
      km_10_on_p_cm_fc : 287,
      km_10_on_a_cm_fc : 288,
      km_105_before_l_cc_fc : 289,
      km_105_before_p_cc_fc : 290,
      km_105_before_a_cc_fc : 291,
      km_105_tran_l_cc_fc : 292,
      km_105_tran_p_cc_fc : 293,
      km_105_tran_a_cc_fc : 294,
      km_105_on_l_cc_fc : 295,
      km_105_on_p_cc_fc : 296,
      km_105_on_a_cc_fc : 297,
      km_105_before_l_cm_fc : 298,
      km_105_before_p_cm_fc : 299,
      km_105_before_a_cm_fc : 300,
      km_105_tran_l_cm_fc : 301,
      km_105_tran_p_cm_fc : 302,
      km_105_tran_a_cm_fc : 303,
      km_105_on_l_cm_fc : 304,
      km_105_on_p_cm_fc : 305,
      km_105_on_a_cm_fc : 306,
      km_11_before_l_cc_fc : 307,
      km_11_before_p_cc_fc : 308,
      km_11_before_a_cc_fc : 309,
      km_11_tran_l_cc_fc : 310,
      km_11_tran_p_cc_fc : 311,
      km_11_tran_a_cc_fc : 312,
      km_11_on_l_cc_fc : 313,
      km_11_on_p_cc_fc : 314,
      km_11_on_a_cc_fc : 315,
      km_11_before_l_cm_fc : 316,
      km_11_before_p_cm_fc : 317,
      km_11_before_a_cm_fc : 318,
      km_11_tran_l_cm_fc : 319,
      km_11_tran_p_cm_fc : 320,
      km_11_tran_a_cm_fc : 321,
      km_11_on_l_cm_fc : 322,
      km_11_on_p_cm_fc : 323,
      km_11_on_a_cm_fc : 324,
      km_115_before_l_cc_fc : 325,
      km_115_before_p_cc_fc : 326,
      km_115_before_a_cc_fc : 327,
      km_115_tran_l_cc_fc : 328,
      km_115_tran_p_cc_fc : 329,
      km_115_tran_a_cc_fc : 330,
      km_115_on_l_cc_fc : 331,
      km_115_on_p_cc_fc : 332,
      km_115_on_a_cc_fc : 333,
      km_115_before_l_cm_fc : 334,
      km_115_before_p_cm_fc : 335,
      km_115_before_a_cm_fc : 336,
      km_115_tran_l_cm_fc : 337,
      km_115_tran_p_cm_fc : 338,
      km_115_tran_a_cm_fc : 339,
      km_115_on_l_cm_fc : 340,
      km_115_on_p_cm_fc : 341,
      km_115_on_a_cm_fc : 342,
      km_12_before_l_cc_fc : 343,
      km_12_before_p_cc_fc : 344,
      km_12_before_a_cc_fc : 345,
      km_12_tran_l_cc_fc : 346,
      km_12_tran_p_cc_fc : 347,
      km_12_tran_a_cc_fc : 348,
      km_12_on_l_cc_fc : 349,
      km_12_on_p_cc_fc : 350,
      km_12_on_a_cc_fc : 351,
      km_12_before_l_cm_fc : 352,
      km_12_before_p_cm_fc : 353,
      km_12_before_a_cm_fc : 354,
      km_12_tran_l_cm_fc : 355,
      km_12_tran_p_cm_fc : 356,
      km_12_tran_a_cm_fc : 357,
      km_12_on_l_cm_fc : 358,
      km_12_on_p_cm_fc : 359,
      km_12_on_a_cm_fc : 360,
      km_125_before_l_cc_fc : 361,
      km_125_before_p_cc_fc : 362,
      km_125_before_a_cc_fc : 363,
      km_125_tran_l_cc_fc : 364,
      km_125_tran_p_cc_fc : 365,
      km_125_tran_a_cc_fc : 366,
      km_125_on_l_cc_fc : 367,
      km_125_on_p_cc_fc : 368,
      km_125_on_a_cc_fc : 369,
      km_125_before_l_cm_fc : 370,
      km_125_before_p_cm_fc : 371,
      km_125_before_a_cm_fc : 372,
      km_125_tran_l_cm_fc : 373,
      km_125_tran_p_cm_fc : 374,
      km_125_tran_a_cm_fc : 375,
      km_125_on_l_cm_fc : 376,
      km_125_on_p_cm_fc : 377,
      km_125_on_a_cm_fc : 378,
      km_13_before_l_cc_fc : 379,
      km_13_before_p_cc_fc : 380,
      km_13_before_a_cc_fc : 381,
      km_13_tran_l_cc_fc : 382,
      km_13_tran_p_cc_fc : 383,
      km_13_tran_a_cc_fc : 384,
      km_13_on_l_cc_fc : 385,
      km_13_on_p_cc_fc : 386,
      km_13_on_a_cc_fc : 387,
      km_13_before_l_cm_fc : 388,
      km_13_before_p_cm_fc : 389,
      km_13_before_a_cm_fc : 390,
      km_13_tran_l_cm_fc : 391,
      km_13_tran_p_cm_fc : 392,
      km_13_tran_a_cm_fc : 393,
      km_13_on_l_cm_fc : 394,
      km_13_on_p_cm_fc : 395,
      km_13_on_a_cm_fc : 396,
      km_135_before_l_cc_fc : 397,
      km_135_before_p_cc_fc : 398,
      km_135_before_a_cc_fc : 399,
      km_135_tran_l_cc_fc : 400,
      km_135_tran_p_cc_fc : 401,
      km_135_tran_a_cc_fc : 402,
      km_135_on_l_cc_fc : 403,
      km_135_on_p_cc_fc : 404,
      km_135_on_a_cc_fc : 405,
      km_135_before_l_cm_fc : 406,
      km_135_before_p_cm_fc : 407,
      km_135_before_a_cm_fc : 408,
      km_135_tran_l_cm_fc : 409,
      km_135_tran_p_cm_fc : 410,
      km_135_tran_a_cm_fc : 411,
      km_135_on_l_cm_fc : 412,
      km_135_on_p_cm_fc : 413,
      km_135_on_a_cm_fc : 414,
      km_14_before_l_cc_fc : 415,
      km_14_before_p_cc_fc : 416,
      km_14_before_a_cc_fc : 417,
      km_14_tran_l_cc_fc : 418,
      km_14_tran_p_cc_fc : 419,
      km_14_tran_a_cc_fc : 420,
      km_14_on_l_cc_fc : 421,
      km_14_on_p_cc_fc : 422,
      km_14_on_a_cc_fc : 423,
      km_14_before_l_cm_fc : 424,
      km_14_before_p_cm_fc : 425,
      km_14_before_a_cm_fc : 426,
      km_14_tran_l_cm_fc : 427,
      km_14_tran_p_cm_fc : 428,
      km_14_tran_a_cm_fc : 429,
      km_14_on_l_cm_fc : 430,
      km_14_on_p_cm_fc : 431,
      km_14_on_a_cm_fc : 432
    };

    console.log("Sending data: \n" + data);

    axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/insert',
                data, { headers: {'Content-Type': 'application/json'} })
    .then(res => {
      console.log(data)
      console.log("Successfully posted!")
      alert('Lagoon Encounter Recorded.')
      this.setState({redirect:true})

    })
    .catch(error => {
      console.log(error.response)
      console.log("Error.")
    });
    */
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
     e.preventDefault();
     const data = {}

     axios.post('http://localhost:5555/data', { data })
      .then(res => {
        console.log(data);
        console.log(this.state.data[0]);
    })
  }


  // RENDER HELPERS

  // Returns a list of HTML turtle rows, for use in the data table.
  getNests_tableRows (m_key, startKm, endKm) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = startKm; i < endKm; i += 0.5) {
      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="center-td">Cc</td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="grey-td"> <input className="form-control" type="number" id="example-text-input" disabled/> </td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="center-td">Cm</td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="grey-td"> <input className="form-control" type="number" id="example-text-input" disabled/> </td>
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
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td" key={key++}><b>Cm Totals</b></td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
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

    // Fill out rows
    for (let i = startKm; i < endKm; i += 0.5) {
      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="bold-right-border center-td">Cc</td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++} className="grey-td"> <input className="form-control" type="number" id="example-text-input" disabled/> </td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="bold-right-border center-td">Cm</td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="number" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="number" id="example-text-input"/> </td>

            <td key={key++} className="grey-td"> <input className="form-control" type="number" id="example-text-input" disabled/> </td>
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
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td bold-right-border" key={key++}>
            <b>Cm Totals</b>
          </td>

          {/* Before */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
      </>
    );

    m_key.key = key;
    return tableRows;
  }

  getEmergences_tableRows (m_key) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = 0; i < 2; i++) {
      tableRows.push (
        <>
          <tr>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
          </tr>
        </>
      );
    }

    m_key.key = key;
    return tableRows;
  }

  render() {
    let nests_tableRows = [];
    let falseCrawls_tableRows = [];
    let emergences_tableRows = [];
    let startKm = 2.5;
    let endKm = 14.0;

    let m_key = {key:0};

    nests_tableRows = this.getNests_tableRows(m_key, startKm, endKm);
    falseCrawls_tableRows = this.getFalseCrawls_tableRows(m_key, startKm, endKm);
    emergences_tableRows = this.getEmergences_tableRows(m_key);

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid survey-container">
          <h1><b>MIDREACH SURVEY SHEET</b></h1><br></br>
          <hr />
          <div className="pb-4"></div>

          <form>
            <div className="form-row">
              {/* Date */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Date</label>
                  <div className="col-9">
                    <input className="form-control" type="date" id="example-date-input"/>
                  </div>
                </div>
              </div>
              {/* Initials */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Initials</label>
                  <div className="col-9">
                    <input className="form-control" type="text" id="example-text-input" />
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
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                    <tr>
                      <td>Cm</td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                    <tr>
                      <td>Dc</td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Notes */}
              <div className="col-md pl-4">
                <div className="form-group row">
                  <label className="pl-2 mb-0"><h3>Notes</h3></label>
                  <textarea className="ml-2" name="message" rows="6" cols="80">
                  </textarea>
                </div>
              </div>
            </div>
          </form>

          <button type="submit" className="btn btn-primary mt-5">SUBMIT</button>
        </div>

        <InternalFooter />
      </>
    );
  }
}



export default SurveyMidreach;
