export type ServiceDetailSection = {
  heading: string;
  paragraph: string;
};

export type ServiceDetailItem = {
  title: string;
  points: string[];
  subPoints?: string[];
};

export type ServiceDetail = {
  assetFolder?: string;
  sections: ServiceDetailSection[];
  importantInfo: {
    items: ServiceDetailItem[];
    restrictions: string[];
    requirements: string[];
  };
};

const standardImportantInfo: ServiceDetail["importantInfo"] = {
  items: [
    {
      title: "Booking + Timing",
      points: [
        "A deposit is required to secure your booking date and time. Final timing and flow are confirmed during planning.",
      ],
    },
    {
      title: "Setup",
      points: [
        "A clean setup area is required. Outdoor events should provide shade or weather cover when needed.",
      ],
    },
  ],
  restrictions: [
    "Open wounds or irritated skin",
    "Service-specific age and skin safety guidelines apply",
    "Please share allergy concerns before the event",
  ],
  requirements: [
    "One table and two chairs",
    "Safe setup space with guest flow room",
    "Outdoor setup requires shade/cover",
  ],
};

export const serviceDetailsByName: Record<string, ServiceDetail> = {
  "Face Painting": {
    assetFolder: "Face Painting",
    sections: [
      {
        heading: "A Clean & Professional Setup",
        paragraph:
          "Everything is sanitized between guests, and only high-quality, skin-safe paints are used. The setup is neat and inviting, adding to the magic of your event.",
      },
      {
        heading: "Beautiful Designs in 5 minutes",
        paragraph:
          "From adorable animals to intricate fantasy designs, each painting is customized to bring out your guests’ personalities. Whether playful or elegant, there’s something for everyone!",
      },
      {
        heading: "Smiling Ear-to-Ear",
        paragraph:
          "Quick enough to keep the line moving, yet detailed enough to wow your guests! Each face comes to life in just minutes, so everyone can get painted and get back to the fun.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Speed Face Painting": {
    assetFolder: "Face Painting",
    sections: [
      {
        heading: "Fast-Moving Design Menu",
        paragraph:
          "Speed face painting uses a tight menu of quick, clean designs to move lines efficiently.",
      },
      {
        heading: "Made for High-Volume Events",
        paragraph:
          "This format is ideal for large crowds, activations, and events where throughput matters most.",
      },
      {
        heading: "Consistent Experience at Scale",
        paragraph:
          "Design choices are streamlined so more guests can be served smoothly while keeping visual quality high.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Body Painting": {
    assetFolder: "Body Painting",
    sections: [
      {
        heading: "Endless Creative Possibilities",
        paragraph:
          "From small, detailed pieces to full-body transformations, body painting can bring any vision to life—whether it's a striking design for a photoshoot, a bold cosplay look, or a work of living art.",
      },
      {
        heading: "Pro-Grade Paints & Technique",
        paragraph:
          "Only high-quality, skin-safe paints are used, applied with expert brushwork, sponging, or airbrush techniques to create stunning, long-lasting designs.",
      },
      {
        heading: "Durable Yet Easy to Wash Off",
        paragraph:
          "The paint stays vibrant for hours, perfect for events, photos, or performances. When you're ready, it washes off easily with soap and water.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Bling Bar": {
    assetFolder: "Bling Bar",
    sections: [
      {
        heading: "A Beautiful Range of Colours to Choose From",
        paragraph:
          "Guests can pick from a wide selection of glitter shades or select from pre-designed face gem arrangements to suit their style and personality.",
      },
      {
        heading: "Sparkle and Shine for Every Guest",
        paragraph:
          "The bling bar adds a magical touch to your event, where guests can choose from a variety of sparkling glitter colours or dazzling face gem designs to enhance their look.",
      },
      {
        heading: "Fast & Fun for All Ages",
        paragraph:
          "With the ability to serve up to 30 guests per hour, the bling bar ensures everyone gets a chance to shine without long waits.",
      },
    ],
    importantInfo: {
      items: [
        {
          title: "Deposit Required",
          points: [
            "A non-refundable deposit is required to secure your booking. Your date and time are only confirmed once the deposit has been received.",
          ],
          subPoints: [
            "We cannot hold multiple dates for one booking. To secure two dates, a separate deposit is required for each.",
          ],
        },
        {
          title: "Only Cosmetic-Grade Glitter",
          points: [
            "Craft glitter is not used. Cosmetic-grade glitter is selected for skin safety while keeping a high sparkle finish.",
          ],
        },
        {
          title: "Need More Time?",
          points: [
            "If additional time is needed, extensions depend on artist availability and are priced by added time.",
          ],
        },
        {
          title: "How to Remove",
          points: [
            "Most glitter removes with wipes. Residual glitter can be washed off with soap or lifted with tape. Face gems peel away gently.",
          ],
        },
      ],
      restrictions: [
        "Children under 3 years old",
        "Open wounds/sores",
        "Eczema",
        "Signs of illness",
        "Allergies to aloe vera, beeswax, coconut oil (contact for full ingredient lists)",
      ],
      requirements: [
        "1 table and 2 chairs",
        "Indoor setup for inclement weather",
        "Outdoor setup requires shade/cover",
      ],
    },
  },
  "Balloon Twisting": {
    assetFolder: "Balloon Twisting",
    sections: [
      {
        heading: "Interactive Fun That Keeps Guests Engaged",
        paragraph:
          "Balloon twisting brings joy to your event, with guests receiving fun creations like animals, swords, or flowers—keeping both kids and adults entertained throughout the day.",
      },
      {
        heading: "Colours are Personally Picked",
        paragraph:
          "This service is a strong fit for family events, community spaces, and high-traffic activationsWith a range of easy-to-love designs, each balloon is crafted quickly to suit the mood of your event, ensuring everyone gets a chance to enjoy the fun..",
      },
      {
        heading: "Quick and Fun for Larger Crowds",
        paragraph:
          "Serving up to 15 guests per hour, balloon twisting is the perfect activity to keep the energy high at your event without the need for long waits.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Glitter Tattoos": {
    assetFolder: "Glitter Tattoos",
    sections: [
      {
        heading: "Longer Wear Than Face Paint",
        paragraph:
          "Glitter tattoos are applied with skin-safe adhesive and cosmetic-grade glitter for strong visual pop.",
      },
      {
        heading: "Great for Outdoor Event Days",
        paragraph:
          "This service performs well in festival and outdoor settings where guests want lower-touch maintenance.",
      },
      {
        heading: "Clean, Quick Application",
        paragraph:
          "Stencil-led designs allow reliable throughput while keeping a polished finish.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Matte Tattoos": {
    assetFolder: "Matte Ink Tattoos",
    sections: [
      {
        heading: "A Wide Range of Sizes and Designs",
        paragraph:
          "From minimalist symbols to intricate patterns, there’s something for everyone. Whether it’s for a party, a festival, or a corporate event, these tattoos make a statement.",
      },
      {
        heading: "Realistic, Temporary Tattoos",
        paragraph:
          "With their sleek black finish, these tattoos look just like real ink. They’re bold, stylish, and perfect for guests who want an edgy design without the commitment.",
      },
      {
        heading: "Waterproof & Easy to Remove",
        paragraph:
          "These tattoos stay on through showers, sweat, and swimming, lasting up to 5 days. When you’re ready, they wipe off easily with rubbing alcohol or oil.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Belly Painting": {
    sections: [
      {
        heading: "Specialty Maternity Artwork",
        paragraph:
          "Belly painting is designed for maternity sessions, celebrations, and meaningful milestone moments.",
      },
      {
        heading: "Planned Session Experience",
        paragraph:
          "Appointments are coordinated around comfort, pose timing, and photography goals.",
      },
      {
        heading: "Design Time Varies by Concept",
        paragraph:
          "Timing is shaped by design complexity and can be tailored from simple motifs to more detailed pieces.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
  "Coming Soon": {
    sections: [
      {
        heading: "Upcoming Service Launches",
        paragraph:
          "Additional offerings such as airbrush tattoos and themed experiences are in development.",
      },
      {
        heading: "Not Yet Bookable",
        paragraph:
          "These services are not currently open for booking and will be announced when ready.",
      },
      {
        heading: "Stay Notified",
        paragraph:
          "Use the contact page to ask about launch timing and future availability.",
      },
    ],
    importantInfo: standardImportantInfo,
  },
};

export function getServiceDetailByName(serviceName: string) {
  return serviceDetailsByName[serviceName];
}

export function buildDefaultServiceDetail(serviceName: string): ServiceDetail {
  return {
    sections: [
      {
        heading: serviceName,
        paragraph: "Detailed service sections will be added here.",
      },
      {
        heading: "Service Overview",
        paragraph: "This panel now uses section-based content rather than best-for/speed fields.",
      },
      {
        heading: "Booking Details",
        paragraph: "Use the contact form for event-specific timing and setup planning.",
      },
    ],
    importantInfo: standardImportantInfo,
  };
}
