import { Router } from '@angular/router'

/* Extracts target ID from URL

router.URL = /configuration/abcd ->
  returns 'abcd'
router.URL = /configuration ->
  returns ''
*/
export const extractTargetIdFromURL = (router: Router) => {
  const potentialResults = router.url.match(/[a-z0-9_-]*[\/]?$/)
  const numberOfDashesInUrl = router.url.match(/([\/]+)/g)
  if (potentialResults?.length && numberOfDashesInUrl?.length === 2) {
    return potentialResults[0]
  }

  return ''
}