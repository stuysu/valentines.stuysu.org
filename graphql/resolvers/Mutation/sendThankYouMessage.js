import Letter from '../../../models/letter';
import { ForbiddenError, UserInputError } from 'apollo-server-micro';
import transporter from '../../../utils/email/sendEmail';
import fieldsCannotBeEmpty from '../../../utils/user-input/fieldsCannotBeEmpty';
import User from '../../../models/user';

export default async (root, { letterId, message }, { user, authenticationRequired }) => {
    authenticationRequired();

    fieldsCannotBeEmpty({ message });

    const letter = await Letter.findById(letterId);

    if (!letter) {
        throw new UserInputError("There's no letter with that id");
    }

    if (letter.toEmail !== user.email) {
        throw new ForbiddenError("You're not allowed to leave a thank you message on that letter");
    }

    if (!letter.thankYouMessage && letter.fromEmail) {
        const letterRecipient = await User.findOne({ email: letter.toEmail });

        await transporter.sendMail({
            to: letter.fromEmail,
            subject:
                letterRecipient.firstName + ' left you a thank you message | StuySU Valentines',
            html: `
                <html>
                  <body
                    style="
                      padding: 1rem;
                      text-align: center;
                      font-family: Georgia, serif;
                      background: #fc6c8540;
                    "
                  >
                    <div
                      style="min-height: 60vh; background: rgba(255, 255, 255, 0.5); padding: 2rem 1rem"
                    >
                      <img
                        src="https://res.cloudinary.com/hoxqr9glj/image/upload/v1613323569/urban-876_nktnkh.png"
                        style="width: 500px; max-width: 80vw"
                      />
                      <h1>${letterRecipient.firstName} sent you a thank you message!</h1>
                
                      <p>
                        Sign on to
                        <a href="https://valentines.stuysu.org">valentines.stuysu.org</a> in
                        order to see it!
                      </p>
                    </div>
                  </body>
                </html>`,
            text: `${user.firstName} sent you a thank you message!. Sign on to valentines.stuysu.org in order to see it!`,
        });
    }

    letter.thankYouMessage = message;
    await letter.save();

    return letter;
};
