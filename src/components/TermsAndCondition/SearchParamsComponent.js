"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation"

const SearchParamsComponent = () => {
  
  const searchParams = useSearchParams();
  const query = searchParams.get("name");
  const [activeTab, setActiveTab] = useState(query || "terms");
 
  useEffect(() => {
    setActiveTab(query || "terms");
 }, [query]);
 
  
  
  
  return (
    <>
    
    <div>
      <div className="relative w-full h-[259px]">
        <div className="w-full h-full object-cover bg-[#FCF8FF] bg-opacity-50 cursor-pointer" />
        {/* Overlay */}
        <div className="absolute bottom-[100px] lg:left-[80px] left-[16px] px-4 py-2 rounded-md">
        {activeTab === 'terms' && (
          <p className="text-black font-bold playfair-display-heading2 lg:tracking-[-1.26px] lg:text-[42px] text-[20px] tracking-[0.2px]">
            Terms and Conditions
          </p>
        )}
        {activeTab === 'privacy' && (
          <p className="text-black font-bold playfair-display-heading2 lg:leading-[120%] lg:tracking-[-1.26px] lg:text-[42px] text-[20px] tracking-[0.2px]">
            Privacy Policy
          </p>
        )}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto" >
      <div className="lg:ml-[80px] lg:mr-[46px] mx-[16px]">
        {/* Tabs */}
        <div className="flex border-b border-[#F2E4FC] mt-4">
          <button 
            className={`mr-[24px] ml-4 lg:mr-[48px] py-2 text-[16px] lg:leading-[120%] lg:text-[20px] ${activeTab === 'terms' ? 'border-b-2  border-[#6F2C91] font-semibold font-roboto text-[#6F2C91]' : 'text-[#000] font-roboto font-[500]'}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms and Condition
          </button>
          <button 
            className={` py-2 text-[16px] lg:text-[20px] lg:leading-[120%] ${activeTab === 'privacy' ? 'border-b-2 border-[#6F2C91] font-semibold font-roboto text-[#6F2C91]' : 'text-[#000] font-roboto font-[500]'}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'terms' && (
            <div>
              <p className='font-roboto lg:text-[20px] text-[14px] tracking-[0.2px]'>
                These terms and conditions ("Terms") govern your use of the AstroVachan platform ("Platform"), provided by Scaltra Technologies Private Limited ("Scaltra Technologies", "we", "us", or "our"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please refrain from using the Platform.
              </p>
              
              <ol className="list-decimal pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
                <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Use of the Platform</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.1 The Platform, including the website and associated applications, offers an online marketplace connecting users with astrologers for astrology-related consultations via chat or call.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.2 The Platform is intended for astrology consultation only. Any advice, information, or guidance provided by astrologers is not to be considered as professional, medical, financial, or legal advice.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.3 The communication (call or chat) between users and astrologers should exclusively occur through the app's provided channels. Users and astrologers are prohibited from sharing their personal contact details during their interactions. If such an exchange is identified during a call or chat, it may lead to the suspension of the user's and/or astrologer's account on the platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.4 Your interaction with the platform should refrain from endorsing discrimination grounded in race, gender, religion, nationality, disability, sexual orientation, or age.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.5 MODIFICATION TO SERVICES; TERMINATION: AstroVachan reserves the right to modify or discontinue the Services, whether in whole or in part, as well as Your account with us, with or without prior notice, for any reason, without incurring any liability to You, any other user, or any third party. This reservation includes the right to terminate Your account immediately under the following circumstances:<br/>(a) If We encounter difficulty in verifying or authenticating Your Registration Data or any other information You have provided.<br/>(b) If We have reasonable belief that Your actions could lead to legal liability for You, AstroVachan, or any of Our other users.<br/>(c) If We have reasonable belief that You have:<br/>(i) Furnished us with falsified or misleading Registration Data or other information.<br/>(ii) Disrupted the experience of other users or impeded the proper administration of the Services.<br/>(iii) Breached these Terms of Service or our Privacy Policy.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.6 AstroVachan exclusively operates as an online consultancy platform and does not endorse or facilitate any form of offline or in-person meetings between astrologers and users. AstroVachan holds no responsibility for any occurrences or situations involving users or astrologers outside the confines of the platform.</span>
                  </p>
                </li>
                <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">User Responsibilities</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.1 Users must be at least 18 years old to use the Platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.2 Users must provide accurate and complete information during the registration process.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.3 Users must respect the privacy and confidentiality of astrologers and other users. Sharing personal information or harassing behaviour is strictly prohibited.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Astrologer Responsibilities</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.1 Users must be at least 18 years old to use the Platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.2 Users must provide accurate and complete information during the registration process.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.3 Users must respect the privacy and confidentiality of astrologers and other users. Sharing personal information or harassing behaviour is strictly prohibited.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Consultancy and Payments</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.1 Users can avail chat or call consultations with available astrologers based on the astrologer's set availability.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.2 Users have the option to replenish their account balance by utilising the secure payment system provided by the platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.3 To initiate a chat or call, users must have a minimum balance in their account as specified in the application.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.4 The user's account balance will decrease in accordance with the call or chat duration, based on the specific astrologer's per-minute rate.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.5 The account balance of users will remain valid indefinitely, except for the amount credit by our offers that we run from time to time.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.6 For all credits added by our offers, we have the authority to revert at any time if we find that uer has furnished us with falsified, duplicate or misleading Registration Data or other information.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.7 Refund Policy: Payments made by the user are non-refundable.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Intellectual Property</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.1 All content and materials on the Platform, including text, graphics, logos, and software, are the property of Scaltra Technologies or its licensors and are protected by intellectual property laws.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.2 Users and astrologers retain ownership of their respective content, such as chat transcripts and profile information.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:tracking-[-0.84px] tracking-[-0.6px]  mb-[16px]">Limitation of Liability</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.1 The Platform is provided on an "as-is" and"as-available" basis. Scaltra Technologies does not warrant the accuracy, reliability, or availability of the Platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.2 Scaltra Technologies shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use the Platform.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Indemnification</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>7.1 Users and astrologers agree to indemnify and hold Scaltra Technologies harmless from any claims, liabilities, losses, damages, and expenses arising from their use of the Platform or violation of these Terms.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Modifications and Termination</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>8.1 Scaltra Technologies reserves the right to modify, suspend, or terminate the Platform or these Terms at any time, with or without notice.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Governing Law</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>9.1 These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Scaltra Technologies is incorporated.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Disputes</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>10.1 If there is any dispute about or involving the Site and/or the Service, by using the services you further agree that the disputed matter will be governed by the laws of India. You agree to the exclusive jurisdiction of the courts of BENGALURU, Karnataka, India.</span>
                    </p></li>
                    <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Contact Us</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>11.1 If you have any questions or concerns about these Terms, please contact us at support@astrovachan.com.</span>
                    </p></li>
              </ol>
            </div>
          )}
          
          {activeTab === 'privacy' && (
             <div>
             <p className='font-roboto lg:text-[20px] text-[14px] lg:leading-[30px] tracking-[0.2px] mb-6'>
             This Privacy Policy outlines how Scaltra Technologies Private Limited {`("we," "us," or "our")`} collects, uses, discloses, and safeguards the personal information of users {`(""you" or "your")`} on the AstroVachan astrology marketplace app. By accessing or using the AstroVachan app, you agree to the terms and practices outlined in this Privacy Policy.
             </p>
             
             <ul className=" pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
               <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Information we collect</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. User Provided Information: When you register on AstroVachan, we may collect personal information such as your name, contact details, birth details, and payment information.</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>b. Automatically Collected Information: We may collect information about your device, IP address, and usage patterns while you navigate through the app.</span>
                 </p>
               </li>
               <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">How we use your Information</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. To Facilitate Consultations: We use your personal information to connect you with astrologers for online consultations. </span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>b. Improving Services: Collected data helps us enhance and personalize your experience on the AstroVachan app.</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>c. Payment Processing: Your payment information is used to process transactions securely.</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>d. Communication: We may use your contact details to send updates, notifications, and promotional materials related to AstroVachan.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Information sharing</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. With Astrologers: Your relevant information is shared with astrologers to facilitate consultations.</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>b. Legal Compliance: We may disclose your information in response to legal requests or to comply with applicable laws.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Security measures</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. We employ industry-standard security measures to protect your information from unauthorized access, disclosure, or alteration.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Data retention</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. We retain your personal information as long as necessary for the purposes outlined in this Privacy Policy or as required by law.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:tracking-[-0.84px] tracking-[-0.6px]  mb-[16px] -ml-5 lg:-ml-7">{"Children's"} privacy </h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.1 The Platform is provided on an {`"as-is" and"as-available"`} basis. Scaltra Technologies does not warrant the accuracy, reliability, or availability of the Platform.</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.2 Scaltra Technologies shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use the Platform.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Changes to the Privacy Policy</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. We reserve the right to modify this Privacy Policy. Changes will be effective upon posting on the AstroVachan app.</span>
                   </p></li>
                   <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Contact us</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. If you have questions or concerns about this Privacy Policy, you can contact us at [support@astrovachan.com].</span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>b. By accessing or using the AstroVachan app, you agree to the terms and practices outlined in this Privacy Policy.</span>
                   </p></li>
             </ul>
           </div>
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};



export default SearchParamsComponent;

