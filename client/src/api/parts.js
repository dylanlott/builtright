import axios from 'axios'
import * as types from '../state/mutation-types'
import user from './user'

const storage = window.localStorage

export default {

  /**
   * addPartToBuild - associate a part to a build
   *
   * @param  {type} part    a `part` object
   * @param  {type} build   ID of the build
   * @param  {type} context context
   * @return {type}         returns resolve if successful, reject if failure
   */
  addPartToBuild (part, oldBuild, newBuild, context) {
    return null
  },

  /**
   * getPartsForBuild - get the list of parts for a build
   *
   * @param  {type} id      the ID of the build
   * @param  {type} context context
   * @return {type}         returns array of parts for the build if successful
   */
  getPartsForBuild (id, context) {
    return new Promise((resolve, reject) => {
      const params = {}
      axios.get(`/parts`, params)
        .then((res) => resolve(res.data.parts))
        .catch((err) => reject(err))
    })
  }
}
