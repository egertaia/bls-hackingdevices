import { HackType } from "../typings/hackType";

export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomSetChar = (hackType: HackType): string => {
    let characterString = '';
    switch (hackType) {
        case HackType.NUMERIC:
            characterString = "0123456789";
            break;
        case HackType.ALPHABET:
            characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZÕÄÖÜ";
            break;
        case HackType.ALPHANUMERIC:
            characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZÕÄÖÜ0123456789";
            break;
        case HackType.GREEK:
            characterString = "Ī‘Ī’Ī“Ī”Ī•Ī–Ī—ĪĪ™ĪĪ›ĪĪ¯Ī˛ĪĪ Ī�Ī£Ī¤Ī�Ī¦Ī§ĪØĪ©";
            break;
        case HackType.BRAILLE:
            characterString = "ā�€ā�ā�‚ā�ā�„ā�…ā�†ā�‡ā�ā�‰ā�ā�‹ā�ā�¨ā�ˇā�¸ā�ā�‘ā�’ā�“ā�”ā�•ā�–ā�—ā�ā�™ā�ā�›ā�ā�¯ā�˛ā�ā� ā��ā�¢ā�£ā�¤ā��ā�¦ā�§ā�Øā�©ā�Ŗā�«ā�¬ā�­ā�®ā�Æā�°ā�±ā�²ā�³ā�´ā�µā�¶ā�·ā�øā�¹ā�ŗā�»ā�¼ā�½ā�¾ā�æ" +
                "ā¢€ā¢ā¢‚ā¢ā¢„ā¢…ā¢†ā¢‡ā¢ā¢‰ā¢ā¢‹ā¢ā¢¨ā¢ˇā¢¸ā¢ā¢‘ā¢’ā¢“ā¢”ā¢•ā¢–ā¢—ā¢ā¢™ā¢ā¢›ā¢ā¢¯ā¢˛ā¢ā¢ ā¢�ā¢¢ā¢£ā¢¤ā¢�ā¢¦ā¢§ā¢Øā¢©ā¢Ŗā¢«ā¢¬ā¢­ā¢®ā¢Æā¢°ā¢±ā¢²ā¢³ā¢´ā¢µā¢¶ā¢·ā¢øā¢¹ā¢ŗā¢»ā¢¼ā¢½ā¢¾ā¢æ" +
                "ā£€ā£ā£‚ā£ā£„ā£…ā£†ā£‡ā£ā£‰ā£ā£‹ā£ā£¨ā£ˇā£¸ā£ā£‘ā£’ā£“ā£”ā£•ā£–ā£—ā£ā£™ā£ā£›ā£ā£¯ā£˛ā£ā£ ā£�ā£¢ā££ā£¤ā£�ā£¦ā£§ā£Øā£©ā£Ŗā£«ā£¬ā£­ā£®ā£Æā£°ā£±ā£²ā£³ā£´ā£µā£¶ā£·ā£øā£¹ā£ŗā£»ā£¼ā£½ā£¾ā£æ";
            break;
        case HackType.RUNES:
            //str="į į�į¢į£į¤į�į¦į§įØį©įŖį«į¬į­į®įÆį°į±į²į³į´įµį¶į·įøį¹įŗį»į¼į½į¾įæį›€į›į›‚į›į›„į›…į›†į›‡į›į›‰į›į›‹į›į›¨į›ˇį›¸į›į›‘į›’į›“į›”į›•į›–į›—į›į›™į›į››į›į›¯į›˛į›į› į›�į›¢į›£į›¤į›�į›¦į›§į›Øį›©į›Ŗ";
            characterString = "į į�į§įØį©į¬į­į»į›į›‘į›’į›“į›”į›•į›–į›—į›į›™į›į››į›į›¯į›˛į›į›¤";
            break;
        default:
            characterString = "0123456789";
            break;
    }

    return characterString.charAt(randomNumber(0, characterString.length));
}
