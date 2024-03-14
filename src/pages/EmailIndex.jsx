import { useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { showErrorMsg } from "../services/event-bus.service"

import { EmailList } from "../cmps/EmailList"
import { AppEmailHeader } from "../cmps/AppEmailHeader"
import { SideBar } from "../cmps/SideBar"
import { EmailFilter } from "../cmps/EmailFilter"

import { EmailCompose } from "./EmailCompose"
import { EmailHamburger } from "../cmps/EmailHamburger"

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter)
  // const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
  const params = useParams()

  useEffect(() => {
    // setSearchParams(filterBy)
    loadEmails()
  }, [params.folder, filterBy])

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
  }

  async function loadEmails() {
    console.log(params.folder);
    try {
      const emails = await emailService.query({ ...filterBy, status: params.folder })
      setEmails(emails)
    } catch (err) {
      console.log('Error in loadEmails', err)
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId)
      setEmails((prevEmails) => {
        return prevEmails.filter(email => email.id != emailId)
      })
    } catch (err) {
      console.log("Error in onRemoveEmail", err)
      showErrorMsg('Could not delete email.')
    }
  }

  async function onApdateEmail(email) {
    try {

      const updateEmail = await emailService.save(email)
      setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === email.id ? updateEmail : currEmail))
      if (params.folder === 'starred' && !email.isStarred) {
        setEmails((prevEmails) => {
          return prevEmails.filter(email => email.isStarred)
        })
      }
    } catch (err) {
      console.log("Error in onApdateEmail", err)
    }
  }

  async function onAddEmail(email) {
    try {
      const saveEmail = await emailService.save(email)
      setEmails((prevEmails) => [...prevEmails, saveEmail])
    } catch (err) {
      console.log("Error in onAddEmail", err)
    }
  }

  const isCompose = searchParams.get('compose') || null

  if (!emails) return <div>Loading...</div>
  return (
    <div className="email-index">
      <EmailHamburger/>
      <AppEmailHeader />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <SideBar />
      {params.emailId && <Outlet />}
      {!params.emailId &&
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onApdateEmail={onApdateEmail}
        />}
      {isCompose && <EmailCompose onAddEmail={onAddEmail} onApdateEmail={onApdateEmail} />}
    </div>
  )
}