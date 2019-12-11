import { Divider, Tag, Icon } from 'antd';
import React from 'react';
import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
  skillData: [],
  skillColumns: [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => (
        <Tag color={'green'} key={text}>
          {text.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Description',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <Icon type="edit" title="edit skill" />
          <Divider type="vertical" />
          <Icon type="delete" title="delete skill" />
        </span>
      )
    }
  ],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const createSkillStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const createSkillSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    skillData: state.skillData.push({
      key: state.skillData.length + 1 + '',
      title: action.title,
      _id: action._id,
      content: action.content
    })
  });

const createSkillFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const updateSkillStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const updateSkillSuccess = (state, action) => {
  const data = state.skillData.map(item => {
    if (item._id === action._id) {
      const updateItem = {
        _id: action._id,
        title: action.title,
        content: action.content,
        key: item.key
      };
      return updateItem;
    }
    return item;
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    skillData: data
  });
};

const updateSkillFail = (state, action) =>
  updateObject(state, {
    error: true,
    loading: false,
    message: action.error
  });

const getListSkillStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    skillData: []
  });

const getListSkillSuccess = (state, action) => {
  const data = action.skills.map((item, index) => {
    const result = { ...item };
    result.key = index + 1 + '';
    return result;
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    skillData: data
  });
};

const getListSkillFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const deleteSkillStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const deleteSkillSuccess = (state, action) => {
  const data = state.skillData.filter(item => {
    if (item._id !== action._id) {
      return item;
    }
  });
  return updateObject(state, {
    skillData: data,
    loading: false,
    error: null,
    message: action.message
  });
};

const deleteSkillFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SKILL_START:
      return createSkillStart(state);
    case actionTypes.CREATE_SKILL_SUCCESS:
      return createSkillSuccess(state, action);
    case actionTypes.CREATE_SKILL_FAIL:
      return createSkillFail(state, action);

    case actionTypes.UPDATE_SKILL_START:
      return updateSkillStart(state);
    case actionTypes.UPDATE_SKILL_SUCCESS:
      return updateSkillSuccess(state, action);
    case actionTypes.UPDATE_SKILL_FAIL:
      return updateSkillFail(state, action);

    case actionTypes.GET_LIST_SKILL_START:
      return getListSkillStart(state);
    case actionTypes.GET_LIST_SKILL_SUCCESS:
      return getListSkillSuccess(state, action);
    case actionTypes.GET_LIST_SKILL_FAIL:
      return getListSkillFail(state, action);

    case actionTypes.DELETE_SKILL_START:
      return deleteSkillStart(state);
    case actionTypes.DELETE_SKILL_SUCCESS:
      return deleteSkillSuccess(state, action);
    case actionTypes.DELETE_SKILL_FAIL:
      return deleteSkillFail(state, action);

    default:
      return state;
  }
};
export default reducer;