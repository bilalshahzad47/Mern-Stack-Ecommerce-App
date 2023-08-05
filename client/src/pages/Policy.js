import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"privacy policy"}>
      <div className="row policy">
        <div className="col-md-6 ">
          <img
            src="/images/policy.avif"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <p className='policy-color'>3rd Party Licensing Notice</p>
        <p className='policy-color'>Conditions of Use</p>
        <p className='policy-color'>Ecommerce INFLUENCER TERMS & CONDITIONS FOR SPONSORED CONTENT</p>
        <p className='policy-color'>Conditions of Use</p>
        <p className='policy-color'>Report Stolen Goods</p>
        <p className='policy-color'>Non-Exhaustive List of Amazon Trademarks</p>
        <p className='policy-color'>Gift Card and Electronic Message Customization Service Terms</p>
        <p className='policy-color'>Trademark Usage Guidelines</p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
