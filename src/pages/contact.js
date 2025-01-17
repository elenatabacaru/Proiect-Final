import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image"
import Layout from "@/components/Layout";

const ContactPage = () => {
const [submitterName, setSubmitterName] = useState("");
const router = useRouter();
const confirmationScreenVisible =
router.query?.success && router.query.success === "true";
const formVisible = !confirmationScreenVisible;
  const ConfirmationMessage = (
    <React.Fragment>
      <p>
        Thank you for submitting this form. Someone should get back to you
        within 24-48 hours.
      </p>
      <button
        onClick={() => router.replace("/contact", undefined, { shallow: true })}
      >
        Submit Another Response
      </button>
    </React.Fragment>
  );
  const ContactForm = (
    <form
      className="container"
      method="POST"
      name="contact-form"
      action="contact/?success=true"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input
        type="hidden"
        name="subject"
        value={`You've got mail from ${submitterName}`}
      />
      <input type="hidden" name="form-name" value="contact-form" />
      <p hidden>
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <label htmlFor="name">Name *</label>
      <input
        id="name"
        name="name"
        required
        onChange={(e) => setSubmitterName(e.target.value)}
        type="text"
      />
      <label htmlFor="phone">Phone number </label>
      <input id="phone" name="phone" required type="text" />
      <label htmlFor="email">E-mail Address </label>
      <input id="email" type="email" name="email" required />
      <label htmlFor="message">Message </label>
      <textarea id="message" name="message" required />
      <button type="submit">Submit</button>
     
    </form>
  );

  return (
    <Layout>
    <div className="container">
      <Head>
        <title>Java Jive Coffee Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Contact Us</h1>
      <p> Got questions? We've got answers.</p>
      <Image src= "/image/contact.jpg" alt="fresh coffee" width={600} height={600}/>
      <main>{formVisible ? ContactForm : ConfirmationMessage}</main>
      <style jsx global>
        {`

          * {
            box-sizing: border-box;
          }
         
          .container {
            display: flex;
            flex-direction: column;
            width: 80%;
            grid-row-gap: 0.5em;
          }
          @media (max-width: 769px) {
            .container {
              width: 100%;
            }
          }
          label {
            font-size: 1.2em;
          }
          input[type="text"],
          input[type="email"],
          textarea {
            font-size: 24px;
            border: solid red 0.1rem;
          }
          button {
            max-width: 400px;
            margin: 0 auto;
            color: black;
            background-color: gray;
            border: none;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            text-transform: uppercase;
            border-radius: 10px;
          }
          button:hover {
            background-color: gray;
          }
        `}
      </style>
    </div>
    </Layout>
  );
}
export default ContactPage