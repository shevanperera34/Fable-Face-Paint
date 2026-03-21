import type { BuilderPage } from "./types";

export const faqPage: BuilderPage = {
  slug: "faq",
  navLabel: "FAQ",
  seo: {title: "FAQ + Policies | Fable Face Paint", description: "Frequently asked questions for all Fable Face Paint services." },
  blocks: [
    {
      id: "f-policies",
      type: "FAQPolicies",
      title: "Common Questions",
      groups: [
        {
          heading: "Face Painting",
          items: [
            { q: "What type of paints do you use?", a: "We use professional-grade, non-toxic, and hypoallergenic paints specifically designed for use on skin, ensuring safety for all ages." },
            { q: "How many faces can you paint per hour?", a: "Our skilled artists can paint approximately 10-12 faces per hour, or 13-20 faces if speed painting, depending on the complexity of the designs." },
            { q: "Do you offer themed designs to match our event?", a: "Absolutely. We can tailor our face painting designs to align with your event's theme or specific requests." },
            { q: "What is the recommended age for face painting?", a: "Face painting is suitable for all ages 3 and above. This is because babies' skin is more sensitive and our insurance does not cover us if we paint under 3 years old." },
            { q: "How do we remove the face paint after the event?", a: "The paint can be easily removed by massaging an oil based makeup remover and/or mild soap and water." },
            {
              q: "Do you require any setup or special accommodations at the venue?",
              a: "We need a table (minimum 4x4 ft) and two chairs in a well-lit area, away from loud speakers. Access to a washroom/sink is helpful but not mandatory, although please let us know if there is no access to water.",
            },
          ],
        },
        {
          heading: "Body Painting",
          items: [
            { q: "Is the body paint safe for sensitive skin?", a: "Yes, we use high-quality, skin-safe paints suitable for all skin types, including sensitive skin." },
            { q: "How long does a full body painting session take?", a: "The duration widely varies based on the coverage and complexity of the design but typically ranges from 2-5 hours." },
            { q: "Can you create custom designs for specific themes or events?", a: "Certainly. We specialize in crafting personalized designs to match your event's theme or your unique vision." },
            { q: "How long does the body paint last?", a: "The paint lasts several hours and can withstand moderate activity but is not waterproof." },
            { q: "Is there anything I should do to prepare for a body painting session?", a: "Please have clean, lotion-free skin and wear appropriate attire based on the area to be painted." },
            { q: "Do you offer body painting for group events or parties?", a: "Yes, we provide body painting services for various events, including parties, festivals, and corporate gatherings." },
            { q: "How do we remove the body paint after the event?", a: "The paint can be easily removed by taking a shower/bath, scrubbing the body with a soapy loofah or rag. If any paint remains, you may massage an oil based makeup remover/coconut oil or use wet wipes to get the rest off." },
          ],
        },
        {
          heading: "Belly Painting",
          items: [
            { q: "Is belly painting safe during pregnancy?", a: "Yes, we use non-toxic, hypoallergenic paints that are safe for both mother and baby." },
            { q: "When is the best time during pregnancy to get a belly painting?", a: "The ideal time is between 6 to 8 months, when the belly is nicely rounded." },
            { q: "Can family members be included in the painting session?", a: "Family and friends are welcome to accompany you to watch and chit chat. Whatever makes you the most comfortable." },
            { q: "How long does a belly painting session take?", a: "Sessions are typically around 2 hours, but may vary depending on the complexity of the design." },
            { q: "Can we take photographs during the session?", a: "Yes, we encourage capturing this special moment. Photos will be taken of the finished design and sent to you digitally. We can also recommend professional photographers if desired." },
            { q: "How do I prepare for a belly painting session?", a: "Wear comfortable and loose clothing (try matching your clothing to the design if you'd like) and ensure your belly is clean and free of lotions or oils." },
          ],
        },
        {
          heading: "Matte Ink Tattoos",
          items: [
            { q: "What are matte ink tattoos?", a: "They are temporary tattoos that mimic the appearance of real ink with a matte finish, offering a realistic look without the commitment." },
            { q: "How long do matte ink tattoos last?", a: "These tattoos are waterproof and can last up to 2-5 days, depending on care." },
            { q: "Are matte ink tattoos safe for all skin types?", a: "Yes, we use skin-safe, hypoallergenic ink suitable for all skin types. Although we are unable to apply over broken skin which includes eczema." },
            { q: "Can I choose custom designs for matte ink tattoos?", a: "We offer a wide range of designs from a wide range of sizes, but the stencils themselves are unable to be custom." },
            { q: "Can matte ink tattoos be removed easily?", a: "Yes, they can be removed with rubbing alcohol or an oil-based remover." },
          ],
        },
        {
          heading: "Glitter Tattoos",
          items: [
            { q: "Are glitter tattoos safe for children's skin?", a: "Yes, we use cosmetic-grade glitter and skin-safe adhesives suitable for all ages." },
            { q: "How long do glitter tattoos last?", a: "They are waterproof and can last between 2-5 days, depending on care." },
            { q: "Can glitter tattoos be removed easily?", a: "Yes, they can be removed by soaking them in a warm bath and then lightly scrubbing. Or with rubbing alcohol or an oil-based product like coconut oil." },
            { q: "Do you offer custom designs or logos for glitter tattoos?", a: "Yes, with at least two weeks' notice, we can create custom stencils to match your event's theme or logo." },
            { q: "Are there any restrictions on where glitter tattoos can be applied?", a: "We recommend applying them to the inner arms for the best application. Restrictions include the face, armpits, private areas, and skin with lots of hair." },
            { q: "How many glitter tattoos can you apply per hour?", a: "We can apply approximately 10-15 glitter tattoos per hour." },
          ],
        },
        {
          heading: "Balloon Twisting",
          items: [
            { q: "What types of balloon designs do you offer?", a: "We offer a range of well-known designs such as puppy, sword, flower, butterfly, etc." },
            { q: "How many balloon creations can you make per hour?", a: "Depending on the complexity, our artists can create approximately 15 balloon sculptures per hour." },
            { q: "Are the balloons safe for children?", a: "Yes, we use high-quality, latex balloons. However, we recommend balloon twisting for children aged 3 and above due to choking hazards." },
            { q: "What's the difference between balloon twisting and balloon decor?", a: "Yes, we offer balloon arches, columns, and centerpieces to enhance your event's decor." },
            { q: "What space and setup do you require at the venue?", a: "We need a small area with a table to set up our balloon station. No chairs are needed." },
            { q: "Can you accommodate large events with balloon twisting services?", a: "Absolutely. We can provide multiple artists for large events to ensure all guests are entertained." },
          ],
        },
        {
          heading: "Bling Bar",
          items: [
            { q: "What is included in the Bling Bar service?", a: "Our Bling Bar offers a wide selection of cosmetic-grade glitters and gems to add sparkle to your guests' looks. These include glitter balm, glitter gel, pixie dust, small rhinestones, and large festival face gems." },
            { q: "Is the glitter safe for all skin types?", a: "Yes, we use cosmetic-grade glitter and skin-safe adhesives suitable for all ages 3 and above." },
            { q: "How long does the bling application last?", a: "The application can last all day or until removed with gentle cleansing. If you are active and/or sweating, it may not last as long." },
            { q: "Can the Bling Bar be customized for themed events?", a: "Yes, the glitter and bling are in itself customizable. We can mix colours and place it in many different ways. If you would like specific colours of glitter, please let us know at least 2 weeks in advance." },
            { q: "How many guests can you accommodate per hour with the Bling Bar?", a: "We can typically serve 15-30 guests per hour, depending on the complexity of the designs." },
            { q: "What setup is required for the Bling Bar at the venue?", a: "We require a table and chairs in a well-lit area to set up our Bling Bar station." },
          ],
        },
        {
          heading: "Coming Soon: Airbrush Tattoos",
          items: [
            { q: "Are airbrush tattoos safe for children's skin?", a: "Yes, we use FDA-compliant, skin-safe airbrush paint suitable for all ages 3 and up." },
            { q: "How long do airbrush tattoos last?", a: "They are waterproof and typically last 2 to 5 days, depending on care." },
            { q: "Can airbrush tattoos be customized to fit our event theme?", a: "Yes, we offer a variety of designs and can create custom stencils with prior notice to match your event's theme." },
            { q: "How many airbrush tattoos can you apply per hour?", a: "Our artists can apply approximately 20-30 airbrush tattoos per hour, depending on the complexity of the designs." },
            { q: "What is required from the venue for airbrush tattoo services?", a: "We require a well-lit area with access to electricity for our equipment." },
            { q: "How can airbrush tattoos be removed?", a: "They can be removed using rubbing alcohol or any oil-based product, such as baby oil." },
          ],
        },
      ],
    },
  ],
};
